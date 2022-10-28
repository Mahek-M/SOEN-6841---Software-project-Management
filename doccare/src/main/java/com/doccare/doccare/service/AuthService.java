package com.doccare.doccare.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.web.multipart.MultipartFile;

import com.doccare.doccare.model.CounselorRegModel;
import com.doccare.doccare.model.DoctorRegNo;
import com.doccare.doccare.model.JWTTokenModel;
import com.doccare.doccare.model.JsonWebTokenResponse;
import com.doccare.doccare.model.User;
import com.doccare.doccare.model.UserUpdateModel;
import com.doccare.doccare.model.VerificationCodeModel;

public interface AuthService {
    public JWTTokenModel authenticate(String username, String password);
    public User register(User user);
    public Integer addProfileImage(MultipartFile image,String username) throws SerialException, SQLException, IOException;
    public String getProfileImage(String username);
    public User verify(String verificationCode);
    public User resetPassword(String code,String newPassword);

    public Integer verifyForgetPassword(String code);
    public VerificationCodeModel forgetPassword(String username);
    public DoctorRegNo getDoctorRegNo();
    public CounselorRegModel getCounselorRegNo();
    public String generateOtpCode(String username);
    public String extractOtpCodeFromBase64MixtureString(String mixedOtp);
    public Integer verifyOtpCode(String code);
    public Integer userUpdate (UserUpdateModel userUpdateModel);
    public List<User> getAllPatients();
    public List<User> getAllDoctors();
    public List<User> getAllCounselors();
}
