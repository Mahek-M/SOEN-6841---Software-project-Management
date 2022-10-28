package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String username);   
    public User findByVerificationCode(String code);
    public User findByOtpCode(String otpCode);
    public User findBydocRegNo(String docRegNo);
    public User findBycounselorRegNo(String counselorRegNo);
}
