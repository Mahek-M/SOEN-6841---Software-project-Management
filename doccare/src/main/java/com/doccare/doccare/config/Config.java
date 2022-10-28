package com.doccare.doccare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.doccare.doccare.filter.JWTAuthenticationEntryPoint;
import com.doccare.doccare.filter.JWTRequestFilter;

@Configuration
@EnableWebSecurity
public class Config {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTRequestFilter jwtRequestFilter;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    
    @Bean
    public DaoAuthenticationProvider getDaoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);

        
        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain filterChain  (HttpSecurity http) throws Exception {
        http.cors();

        http.csrf().disable().
        authorizeRequests().antMatchers("/api/v1/authenticate","/api/v1/register","/api/v1/verify","/api/v1/forgetpassword","/api/v1/verifyforgetpassword","/api/v1/docreg","/api/v1/conreg","/api/v1/redirectforgetpass","/api/v1/resetpass","/api/v1/generateotp","/api/v1/role","/api/v1/verifyotp","/api/v1/userexists","/api/v1/profileImg","/api/v1/doctors").permitAll().
        anyRequest().authenticated().and()
        .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();

    }

    @Bean
    public AuthenticationManager getAuthenticationProvider (AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
}
