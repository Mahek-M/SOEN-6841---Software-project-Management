package com.doccare.doccare.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

public abstract class MailService {
    // @Setter(AccessLevel.PRIVATE)
    @Getter
    @Setter
    private String from;
    @Getter
    @Setter
    private String to;
    @Getter
    @Setter
    private String displayName; // this name should come from the user input :: db record
    @Getter
    @Setter
    private String subject;
    @Getter
    @Setter
    private String content;
    @Getter
    @Setter
    private Map<String,Object> context;
    private String templateContent; // fetched from the thymleaf email template vaia SpringTemplateEngine;

    @Autowired
    protected JavaMailSender mailSender;
    @Autowired
    protected SimpleMailMessage templateMailMessage;

    public abstract boolean sendMail(String varificationLink,String mail,String name) throws MessagingException;
    public abstract boolean sendOtpMail(String extractedOtpCode,String mail,String name) throws MessagingException;


    // method are not planned yet 
}
