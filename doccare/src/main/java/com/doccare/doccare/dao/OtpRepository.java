package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.OtpModel;

@Repository
public interface OtpRepository extends JpaRepository<OtpModel,Long> {
    public OtpModel findByOtpNumber(String otpNumber);
}
