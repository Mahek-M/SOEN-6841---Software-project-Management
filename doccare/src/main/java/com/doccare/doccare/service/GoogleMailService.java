package com.doccare.doccare.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.nimbusds.jose.util.StandardCharset;

@Service
public class GoogleMailService extends MailService {
    private MimeMessage message;
    private MimeMessageHelper mimeMessageHelper;
    @Autowired
    private SpringTemplateEngine tmeplateEngine;
    private Logger logger = LoggerFactory.getLogger(GoogleMailService.class);
    private Context context;
    @Value("classpath:/logo.png")
    Resource resourceFile;

    public GoogleMailService() throws MessagingException {
        // this.tmeplateEngine = new SpringTemplateEngine();
       

    }

    private void config (Map<String,Object> variableContext) throws MessagingException {
        this.message = super.mailSender.createMimeMessage();
        this.mimeMessageHelper = new MimeMessageHelper(this.message,
                                                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                                                        StandardCharset.UTF_8.name()
        );

        // super.setContext(variableContext); // don't know if it is neccessary as I will use the moment i set it. so need to think about it . 
        // context = new Context();
        // context.setVariables(getContext());

        // this.logger.info("Value from direct templateEngine.process " + this.tmeplateEngine.process("EmailTemplate.html", context));


        this.mimeMessageHelper.setTo(super.getTo());
        this.mimeMessageHelper.setFrom(super.getFrom());
        this.mimeMessageHelper.setSubject("Verify your MediScope account");
        this.mimeMessageHelper.addInline("logo.png", resourceFile);
        // this.mimeMessageHelper.setText(getDisplayName(), getContent());
        this.mimeMessageHelper.setText(getContent(), true);
        this.logger.info("Data of content :"+getContent());

    }

    @Override
    public boolean sendMail(String verificationLink,String mail,String name) throws MessagingException {
        super.setTo(mail);
        super.setFrom("mediscopeofficial@gmail.com");
        super.setDisplayName("Mediscope");

        
        try {
            Map<String,Object> con = new HashMap<>();
            con.put("firstName",name);
            con.put("link",verificationLink);
            

            super.setContext(con); // don't know if it is neccessary as I will use the moment i set it. so need to think about it . 
            context = new Context();
            context.setVariables(getContext());
            super.setContent(this.tmeplateEngine.process("EmailTemplate.html", context));

            this.config(con);
            super.mailSender.send(this.message);

            return true;

        } catch(MailException e) {
            e.printStackTrace();
            
            return false;
        }
        // return false;
    }

    



    
}