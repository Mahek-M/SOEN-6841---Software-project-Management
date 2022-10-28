package com.doccare.doccare.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.ParseException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.doccare.doccare.controller.AuthController;
import com.doccare.doccare.dao.CounselorRegNoRepository;
import com.doccare.doccare.dao.DoctorRegNoRepository;
import com.doccare.doccare.dao.ProfileImageRepository;
import com.doccare.doccare.dao.RoleRepository;
import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.CounselorRegModel;
import com.doccare.doccare.model.DoctorRegNo;
import com.doccare.doccare.model.JWTTokenModel;
import com.doccare.doccare.model.JsonWebTokenResponse;
import com.doccare.doccare.model.ProfileImage;
import com.doccare.doccare.model.Role;
import com.doccare.doccare.model.User;
import com.doccare.doccare.model.UserUpdateModel;
import com.doccare.doccare.model.VerificationCodeModel;
import com.doccare.doccare.utils.JWTUtil;
import com.google.common.collect.Iterables;
import com.nimbusds.jose.util.StandardCharset;

import net.bytebuddy.utility.RandomString;

@Service
public class AuthServiceImpl implements AuthService{
    private Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
    @Autowired
    private UserDetailsService userDetailsUservice;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JWTUtil jwtUtil;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GoogleMailService mailService;
    @Autowired
    private DoctorRegNoRepository doctorRegNoRepository;
    @Autowired
    private CounselorRegNoRepository counselorRegNoRepository;
    @Autowired
    private ProfileImageRepository profileImageRepo;
    // @Autowired
    // private BlackListedJWTTokenRepository blackListedJWTTokenRepository;
    // @Autowired
    // private BLackListedJWTTokenUtil bLackListedJWTTokenUtil;
    
    
    // @Autowired
    // private JavaMailSender javaMailSender;

    private String calculateExpiryTime () {
        SimpleDateFormat dateFormatter = new SimpleDateFormat("E-MM-dd'T'HH:mm:ss.SSSZ-yyyy");
        
        Calendar currentTime = Calendar.getInstance();
        currentTime.add(Calendar.MINUTE, 30);
        String currentTimeString = dateFormatter.format(currentTime.getTime()).toString();
        
        return currentTimeString;
    }

    @Override
    public JWTTokenModel authenticate(String username, String password) {
        UserDetails userDetails = this.userDetailsUservice.loadUserByUsername(username);

        if (userDetails == null) {
            return null;
        }
        
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password,userDetails.getAuthorities());
        
        JWTTokenModel tokenModel = new JWTTokenModel();
        
        try {
            authenticationManager.authenticate(token);


            String jwtToken = this.jwtUtil.generateToken(userDetails);
            
            // this.bLackListedJWTTokenUtil.saveTheGeneratedToken(username, jwtToken, true);
            
            
            logger.info("token "+jwtToken);
            tokenModel.setBearer(jwtToken);
            tokenModel.setExpireDate(this.calculateExpiryTime());

        } catch (AuthenticationException e) {
            e.printStackTrace();
        }
        

        return tokenModel;
    }
    
    @Override
    public User register(User user) {
        String verificationCode = RandomString.make(64);
        SimpleDateFormat dateFormatter = new SimpleDateFormat("E-MM-dd'T'HH:mm:ss.SSSZ-yyyy");
        
        Calendar currentTime = Calendar.getInstance();
        currentTime.add(Calendar.MINUTE, 5);
        String currentTimeString = dateFormatter.format(currentTime.getTime()).toString();

        String timeDateBase64 = Base64.getEncoder().encodeToString(currentTimeString.getBytes());
        verificationCode = verificationCode + "."+timeDateBase64;
        
        
        User ifAvail = this.userRepository.findByEmail(user.getEmail());
        if (ifAvail != null) {
            return ifAvail;
        }
        user.setPassword(this.passwordEncoder.encode(user.getPassword())); // encoding the password with bcrypt algorithm which is already declared in the bean
        user.setVerificationCode(verificationCode);
        user.setEnabled(false);

        List<Role> roleList = new ArrayList<>();
        for (Role roleItem  : user.getRole()) {
            Role role = this.roleRepository.findByRole(roleItem.getRole());
        
            roleList.add(role);
        }
        user.setRole(roleList);
        
        logger.info("The verification link is : http://localhost:4445/api/v1/verify?code="+user.getVerificationCode());
        
        // if (user.getDocRegNo().equals("")) {
        //     user.setDocRegNo(null);
        // }
        // if (user.getCounselorRegNo().equals("")) {
        //     user.setCounselorRegNo(null);
        // }


        this.userRepository.save(user);
        try {
            this.mailService.sendMail("http://localhost:4445/api/v1/verify?code="+user.getVerificationCode(),user.getEmail(),user.getName());
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        this.logger.info("Checking if the role is exists :"+user.getRole().size());


        return user;
    }

    @Override
    public Integer addProfileImage(MultipartFile image,String username) throws SerialException, SQLException, IOException {
        User user = this.userRepository.findByEmail(username);
        ProfileImage profileImage = this.profileImageRepo.findByUser(user);

        byte[] imageByteArray = image.getBytes();
        Blob imageBlob = new SerialBlob(imageByteArray);
        
        String base64Image = null;
        
        try{
            base64Image = Base64.getEncoder().encodeToString(imageByteArray);
            profileImage.setImage(base64Image);
            profileImage.setUser(user);

            this.profileImageRepo.save(profileImage);

        } catch (Exception e) {
            e.printStackTrace();
            return 199;
        }

        return 200;
    }

    @Override
    public String getProfileImage(String username) {
        User user = this.userRepository.findByEmail(username);
        if (user == null) {
            return "user does not exists";
        }

        return user.getProfileImage().getImage();
    }


    @Override
    public User verify(String code) {
        User user = this.userRepository.findByVerificationCode(code);
      
        if (user != null) {
            if (user.isEnabled()) {
                return user;
            } else {
                user.setEnabled(true);
            }
        }
        this.userRepository.save(user);
        return user;
    }

    protected boolean isVerificationCodeExpired(String code) {
        Date time = null;
        
        // at first need to check if the expiry time has gone
        String[] parts = code.split("\\.");
        String base64ToString = new String(Base64.getDecoder().decode(parts[1].getBytes()));

        // "Mon Jun 06 21:08:05 AKDT 2022"
        String timeString = base64ToString;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("E-MM-dd'T'HH:mm:ss.SSSZ-yyyy");
        Date currentTimeToCompare = Calendar.getInstance().getTime();
        try {
            currentTimeToCompare = simpleDateFormat.parse(simpleDateFormat.format(currentTimeToCompare));
        } catch (ParseException e1) {
            e1.printStackTrace();
        }
        try {
            time = simpleDateFormat.parse(timeString);
            logger.info(time.toString()+"yo yo ");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long fiveMin = 1000 * 60 * 1; // converting 1 minute into milisecond for comparisn
        long elapsed = time.getTime() - currentTimeToCompare.getTime() ;
        
        if (elapsed < fiveMin) {
           return true;
        } else {

            return false;
        }
    }

    @Override
    public VerificationCodeModel forgetPassword(String username) {
        User user = this.userRepository.findByEmail(username);
        if (user == null) {
            return null;
        }
        String verificationCode = RandomString.make(64);
        SimpleDateFormat dateFormatter = new SimpleDateFormat("E-MM-dd'T'HH:mm:ss.SSSZ-yyyy");
        
        Calendar currentTime = Calendar.getInstance();
        currentTime.add(Calendar.MINUTE, 5);
        String currentTimeString = dateFormatter.format(currentTime.getTime()).toString();

        String timeDateBase64 = Base64.getEncoder().encodeToString(currentTimeString.getBytes());
        verificationCode = verificationCode + "."+timeDateBase64;

        if (user != null) {
            user.setVerificationCode(verificationCode);
        }
        this.userRepository.save(user);

        VerificationCodeModel code = new VerificationCodeModel();
        code.setCode(verificationCode);

        try {
            this.mailService.sendResetPasswordMail("http://localhost:4445/api/v1/redirectforgetpass?code="+verificationCode, user.getEmail(), user.getName());
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return code;
    }

    @Override
    public User resetPassword(String code,String newPassword) {
        if (this.isVerificationCodeExpired(code)) {
            User user = new User();
            user.setEmail("Code is expired");
            return user;
        }
        User user =this.userRepository.findByVerificationCode(code);
        this.logger.info("Reseting password :: new password : "+newPassword);
        user.setPassword(this.passwordEncoder.encode(newPassword));

        this.userRepository.save(user);
        
        return user;
    }


    @Override
    public Integer verifyForgetPassword(String code) {
        if (this.isVerificationCodeExpired(code)) {
            return 199;
        }
        
        return 200;
    }

    @Override
    public DoctorRegNo getDoctorRegNo() {
        // List<DoctorRegNo> listOfRegObj = this.doctorRegNoRepository.findAll();
       
        List<User> userList = this.userRepository.findAll().stream().filter(item -> item.getDocRegNo() != null).toList();

        String returnAbleString = "doc_";
        if (userList.size() == 0) {
            returnAbleString += 1;
            DoctorRegNo docTemp = new DoctorRegNo();
            docTemp.setRegNo(returnAbleString);
            return docTemp;
        }

        User lastUser = userList.get(userList.size() - 1);


        if(lastUser.getDocRegNo() != null) {
            Integer number = Integer.parseInt(lastUser.getDocRegNo().split("_")[1]);
            number += 1;
            returnAbleString += String.valueOf(number);

        } else {
            returnAbleString += 1;
        }
        DoctorRegNo doc = new DoctorRegNo();
        doc.setRegNo(returnAbleString);
        return doc;

        // this.logger.info("Size of list of obj : "+listOfRegObj.size());

        // if(listOfRegObj.size() == 0) {
        //     DoctorRegNo ret = new DoctorRegNo();
        //     this.logger.info("This portion is still working");
        //     ret.setRegNo("doc_1");
        //     return ret;
        // }

        // DoctorRegNo doctorRegNo = listOfRegObj.get(listOfRegObj.size() - 1);
        // // DoctorRegNo doctorRegNo = Iterables.getLast(listOfRegObj);

        // String regNo = doctorRegNo.getRegNo();
        // String[] regNoSplitedArray = regNo.split("_");
        // Integer number = Integer.parseInt(regNoSplitedArray[1]);

        // String returnableRegNo = "doc_"+(number + 1);

        // DoctorRegNo returnAbleRegNumberObject = new DoctorRegNo();
        // returnAbleRegNumberObject.setRegNo(returnableRegNo);
        // return returnAbleRegNumberObject;
    }

    @Override
    public CounselorRegModel getCounselorRegNo() {
        List<User> userList = this.userRepository.findAll().stream().filter(item -> item.getCounselorRegNo() != null).toList();
        

        String returnAbleString = "con_";
        if (userList.size() == 0) {
            returnAbleString += 1;

            CounselorRegModel conTemp = new CounselorRegModel();
            conTemp.setRegNo(returnAbleString);
            return conTemp;
        }
        User lastUser = userList.get(userList.size() - 1);


        if(lastUser.getCounselorRegNo() != null) {
            Integer number = Integer.parseInt(lastUser.getCounselorRegNo().split("_")[1]);
            number += 1;
            returnAbleString += String.valueOf(number);

        } else {
            returnAbleString += 1;
        }
        CounselorRegModel con = new CounselorRegModel();
        con.setRegNo(returnAbleString);
        return con;
    }

    @Override
    public String generateOtpCode(String username) {
        User user = this.userRepository.findByEmail(username);
        SimpleDateFormat dateFormatter = new SimpleDateFormat("E-MM-dd'T'HH:mm:ss.SSSZ-yyyy");
        
        Calendar currentTime = Calendar.getInstance();
        currentTime.add(Calendar.MINUTE, 5);
        String currentTimeString = dateFormatter.format(currentTime.getTime()).toString();


        if (user == null)  {
            return "This user does not exists";
        }

        Random randomNum = new Random();
        Integer randomOtpNumber = randomNum.nextInt(10000);
        String otpCode = null;

        if (String.valueOf(randomOtpNumber).length() < 4) {
            otpCode = String.format("40%d", randomOtpNumber);
        } else {
             otpCode = String.format("%4d", randomOtpNumber);
        }
        


        String currentTimeBase64String = Base64.getEncoder().encodeToString(currentTimeString.getBytes());
        String returnAbleOtpFormat = otpCode+"."+currentTimeBase64String;

        // we have to check the code that we have generated before proceeding to next
        User userFromDbBySearchForOtp = this.userRepository.findByOtpCode(returnAbleOtpFormat);
        if(userFromDbBySearchForOtp != null) {
            randomOtpNumber = randomNum.nextInt(10000);
            otpCode = String.format("%4d", randomOtpNumber);
            
            returnAbleOtpFormat = otpCode + "." + currentTimeBase64String;
        }

        user.setOtpCode(returnAbleOtpFormat);

        this.userRepository.save(user);

        try {
            this.mailService.sendOtpMail(this.extractOtpCodeFromBase64MixtureString(returnAbleOtpFormat), user.getEmail(), user.getName());
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return returnAbleOtpFormat;
    }
    
    @Override
    public String extractOtpCodeFromBase64MixtureString(String mixedOtp) {
        String[] splitedMixedOtpArray = mixedOtp.split("\\.");

        return splitedMixedOtpArray[0];
    }
    @Override
    public Integer verifyOtpCode(String code) {
        User user = this.userRepository.findByOtpCode(code);

        if(user == null) {
            return null;
        }

        String otpCode = user.getOtpCode();

        if(isVerificationCodeExpired(otpCode)) {
            return 199;
        }

        return 200;
    }

    @Override
    public Integer userUpdate(UserUpdateModel userUpdateModel) {
        User user = this.userRepository.findByEmail(userUpdateModel.getUsername());
        if (user == null) {
            return 199;
        }
        user.setName(userUpdateModel.getName());
        user.getAddress().setAddress(userUpdateModel.getAddress());

        this.userRepository.save(user);

        return 200;
    }

    @Override
    public List<User> getAllPatients() {
        List<User> patientList = this.userRepository.findAll()
                                                    .stream()
                                                    .filter(item -> (item
                                                                    .getRole()
                                                                    .get(0)
                                                                    .getRole().equals("patient")))
                                                    .toList();

        return patientList;
    }

    @Override
    public List<User> getAllDoctors() {
        List<User> doctorList = this.userRepository.findAll()
                                                    .stream()
                                                    .filter(item -> (item
                                                    .getRole()
                                                    .get(0)
                                                    .getRole().equals("doctor")))
                                                    .toList();
        return doctorList;
    }

    @Override
    public List<User> getAllCounselors() {
        return this.userRepository
        .findAll()
        .stream()
        .filter(item -> (item
        .getRole()
        .get(0)
        .getRole().equals("counselor")))
        .toList();
    }
  
}
