package com.doccare.doccare.seeder;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.doccare.doccare.dao.ProfileImageRepository;
import com.doccare.doccare.dao.RoleRepository;
import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.Address;
import com.doccare.doccare.model.ProfileImage;
import com.doccare.doccare.model.Role;
import com.doccare.doccare.model.User;

/**
 * This is a seeder class that seed some initial data to the database.
 */
@Component
public class Seeder {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private Logger logger = LoggerFactory.getLogger(Seeder.class);
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ProfileImageRepository profileImageRepo;

    /**
     * This method will seed data for the role table
     */
    private void seedRole() {
        logger.info("Started to seed role");
        List<String> roleNameList = new ArrayList<>();
        roleNameList.add("manager");
        roleNameList.add("patient");
        roleNameList.add("doctor");
        roleNameList.add("counselor");

        for (String role : roleNameList) {
            Role roleObj = new Role();
            roleObj.setRole(role);

            Role roleDb = this.roleRepository.findByRole(role);

            if (roleDb == null) {
                logger.info("Need to seed role");

                this.roleRepository.save(roleObj);
            } else {
                logger.info("No need to seed role");
            }

        }
    }

    /**
     * This methdo will seed data for the manager credential to the user table.
     */
    private void seedManagerCredential() {
        if(this.userRepository.findByEmail("superuserdoccare@yopmail.com") == null) {
            User user = new User();
            ProfileImage profileImage = new ProfileImage();
            Address address = new Address();
            
            user.setName("Manager user");
            user.setEmail("superuserdoccare@yopmail.com");
            user.setPassword(this.passwordEncoder.encode("rootmediscope"));
            Role role = this.roleRepository.findByRole("manager");
            
            // profileImage.setUser(user);
            // profileImage.setImage(null);
            // this.profileImageRepo.save(profileImage);
            profileImage.setImage("");
            profileImage.setUser(user);

            user.setProfileImage(profileImage);
            address.setAddress("null");
            address.setUser(user);
            user.setAddress(address);

            List<Role> roleList = new ArrayList<>();
            roleList.add(role);
            user.setRole(roleList);

            User userDb = this.userRepository.findByEmail("root@medicare.com");
            if (userDb == null) {
                this.logger.info("The manager cred is being seeded");
                this.userRepository.save(user);

            } else {
                this.logger.info("The manager cred already exists");
            }
        }
        


    }

    /**
     * This is event listener for listen to the RefreshedEvent in spring boot. By this we will be able to get 
     * access to the @autowired and other stuff as the container will be finished its initialization.
     * @param event
     */
    @EventListener
    public void seed(ContextRefreshedEvent event) {
        this.seedRole();
        this.seedManagerCredential();

    }
}
