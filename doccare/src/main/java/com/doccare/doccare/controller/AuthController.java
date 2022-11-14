package com.doccare.doccare.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.mail.MessagingException;
import javax.sql.rowset.serial.SerialException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.Address;
import com.doccare.doccare.model.AssesmentAnswer;
import com.doccare.doccare.model.AssesmentAnswerGroup;
import com.doccare.doccare.model.AuthRequest;
import com.doccare.doccare.model.CounselorRegModel;
import com.doccare.doccare.model.DoctorRegNo;
import com.doccare.doccare.model.JWTTokenModel;
import com.doccare.doccare.model.Role;
import com.doccare.doccare.model.User;
import com.doccare.doccare.model.UserUpdateModel;
import com.doccare.doccare.model.VerificationCodeModel;
// import com.doccare.doccare.model.JsonWebTokenResponse;
// import com.doccare.doccare.service.AuthService;
import com.doccare.doccare.service.MailService;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.oauth2.sdk.Response;
import com.doccare.doccare.service.AuthService;
import com.doccare.doccare.service.GoogleMailService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(method = RequestMethod.GET,value = "/api/v1")
public class AuthController {
    private Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    // @Autowired
    // private BlackListedJWTTokenRepository blackListedJWTTokenRepository;


    
    @GetMapping("/")
    public String hello() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Set<GrantedAuthority> auth = (Set<GrantedAuthority>) user.getAuthorities();

        for (GrantedAuthority authItem : auth) {
            this.logger.info(authItem.getAuthority()+" checking the role");

        }
        return "Hello world this is an authenticated access";
    }
    @PostMapping("/authenticate")
    public ResponseEntity<JWTTokenModel> authenticate(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(this.authService.authenticate(authRequest.getUsername(), authRequest.getPassword()));
    }

    @PostMapping(value = "/register",consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public User register(@RequestBody User user) {
        logger.info(user.getPassword());
        return this.authService.register(user);
    }

    @PostMapping(value = "/profileImg",consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Integer> addProfileImage(@RequestParam("profileImage") MultipartFile image,@RequestParam("username") String username) throws SerialException, SQLException, IOException {

        return ResponseEntity.ok(this.authService.addProfileImage(image, username));
    }

    @GetMapping(value = "/getProfileImg",produces = {MediaType.ALL_VALUE})
    public ResponseEntity<String> getProfileImage(@RequestParam("username") String username) {
        return ResponseEntity.ok(this.authService.getProfileImage(username));
    }
    // @GetMapping("/verify")
    // public User verify(@RequestParam("code") String code) {
    //     return this.authService.verify(code);
    // }


    @GetMapping("/forgetpassword")
    public ResponseEntity<VerificationCodeModel> forgetPassword(@RequestParam String username) {
        logger.info(username);
        return ResponseEntity.ok(this.authService.forgetPassword(username));
    }

    @GetMapping("/resetpass")
    public ResponseEntity<User> resetPass(@RequestParam String code, @RequestParam String password) {
        this.logger.info("From auth : "+password);
        return ResponseEntity.ok(this.authService.resetPassword(code,password));
    }
    @GetMapping("/verifyforgetpassword")
    public ResponseEntity<Integer> verifyForgetPassword (@RequestParam String code) {
        return ResponseEntity.ok(this.authService.verifyForgetPassword(code));
    }

    @GetMapping("/me") 
    public ResponseEntity<User> getMe() {
        UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userRepository.findByEmail(details.getUsername());

        List<Role> roleList=  new ArrayList<>();

        for (GrantedAuthority auth : details.getAuthorities()) {
            Role tempRole = new Role();
            tempRole.setRole(auth.getAuthority());
            roleList.add(tempRole);
        }
        // user.setRole(roleList);
        return ResponseEntity.ok(user);
    }

    @GetMapping(value = "/docreg")
    public ResponseEntity<DoctorRegNo> getDoctorRegNo() {
        return ResponseEntity.ok(this.authService.getDoctorRegNo());   
    }

    @GetMapping(value = "/conreg")
    public ResponseEntity<CounselorRegModel> getCounselorsRegNo() {
        return ResponseEntity.ok(this.authService.getCounselorRegNo());
    }

    @GetMapping(value = "/generateotp")
    public ResponseEntity<String> generateOtpCode(@RequestParam String username) {
        return ResponseEntity.ok(this.authService.generateOtpCode(username));
    }
    @GetMapping(value = "/verifyotp")
    public ResponseEntity<Integer> verifyOtp(@RequestParam String otpCode) {
        return ResponseEntity.ok(this.authService.verifyOtpCode(otpCode));
    }

    @GetMapping(value = "/role")
    public String getRole (@RequestParam String username) {
        User user = this.userRepository.findByEmail(username);
        String role = null;
        if (user != null) {
            role = user.getRole().get(0).getRole();
        }
        return role;
    }

    @GetMapping(value = "/userexists")
    public Integer userExists(@RequestParam String username) {
        User user = this.userRepository.findByEmail(username);
        if (user == null) {
            return 199;
        }
        return 200;
    }
    // @GetMapping(value = "/redirectforgetpass")
    // public String redirectToForgetPasswordPage(@RequestParam String code) {
    //     return "redirect:http://localhost:3000/resetpass?code="+code;
    // }

    // @PostMapping(value = "/forgetpass")
    // public ResponseEntity<Integer> forgetPassword(@RequestParam String username) {
        
    //     return ResponseEntity.ok(this.authService.forgetPassword(username));
    // }

    @PostMapping(value = "/updateUserInfo")
    public ResponseEntity<Integer> updateAddress (@RequestBody UserUpdateModel userUpdateModel) {
        return ResponseEntity.ok(this.authService.userUpdate(userUpdateModel));
    }

    @GetMapping(value=  "/patients")
    public ResponseEntity<List<User>> getAllPatients() {
        return ResponseEntity.ok(this.authService.getAllPatients());
    }

    @GetMapping(value=  "/doctors")
    public ResponseEntity<List<User>> getAllDoctors() {
        return ResponseEntity.ok(this.authService.getAllDoctors());
    }

    @GetMapping(value=  "/counselors")
    public ResponseEntity<List<User>> getAllCounselors() {
        return ResponseEntity.ok(this.authService.getAllCounselors());
    }
    
    @DeleteMapping(value = "/user")
    public ResponseEntity<Integer> deleteUser(@RequestParam String username) {
        return ResponseEntity.ok(this.authService.deleteUser(username));
    }

    @PutMapping(value = "/assesment")
    public ResponseEntity<AssesmentAnswerGroup> saveAssesmentAnswers(@RequestBody List<AssesmentAnswer> assesmentAnswersList) {
        return ResponseEntity.ok(this.authService.saveAssesmentAnswers(assesmentAnswersList));
    }

    @GetMapping(value = "/isassesmentavail")
    public ResponseEntity<Boolean> checkIfTheUserHasAssesmentFilled() {
        return ResponseEntity.ok(this.authService.isIhavefilledTheAssesment());
    }

    @GetMapping(value = "/assesments")
    public ResponseEntity<List<AssesmentAnswer>> getAssesmentAnswers(@RequestParam String username) {
        return ResponseEntity.ok(this.authService.getAssesmentAnswers(username));
    }

    @GetMapping(value = "/assesmentusers")
    public ResponseEntity<List<User>> getUsersWithAssesmentFilled () {
        return ResponseEntity.ok(this.authService.getUsersWithAssesmentFilled());
    }

    @DeleteMapping(value= "/rejectfromcon")
    public ResponseEntity<Boolean> rejectAppoinmentFromCounselor(@RequestParam String username) {
        return ResponseEntity.ok(this.authService.rejectAppoinmentFromCounselor(username));
    }
}
