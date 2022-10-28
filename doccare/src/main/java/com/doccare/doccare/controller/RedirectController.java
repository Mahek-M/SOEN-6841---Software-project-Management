package com.doccare.doccare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.doccare.doccare.model.User;
import com.doccare.doccare.service.AuthService;

@Controller
@RequestMapping(method = RequestMethod.GET,value ="/api/v1")
public class RedirectController {
    @Autowired
    private AuthService authService;

    @GetMapping(value = "/redirectforgetpass")
    public String redirectToForgetPasswordPage(@RequestParam String code) {
        return "redirect:http://localhost:3000/resetpass?code="+code;
    }

    @GetMapping("/verify")
    public String verify(@RequestParam("code") String code) {
        User user = this.authService.verify(code);
        if (user != null) {
            return "redirect:http://localhost:3000/";
        }
        return "redirect:http://localhost:3000/";
    }
}
