package com.doccare.doccare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.Role;
import com.doccare.doccare.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(username);
        List<GrantedAuthority> authorities = new ArrayList<>();
        List<Role> roleList = user.getRole();

        for (Role roleItem : roleList) {
            authorities.add(new SimpleGrantedAuthority(roleItem.getRole()));
        }

        if (user == null) {
            throw new UsernameNotFoundException("No one is registered by this username");

        }
        
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }
    
}
