package com.doccare.doccare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="otp_table")
@Getter
@Setter
@NoArgsConstructor
public class OtpModel {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "otpNumber")
    private String otpNumber;
    @Column(name = "expDate")
    private String expDate;
}
