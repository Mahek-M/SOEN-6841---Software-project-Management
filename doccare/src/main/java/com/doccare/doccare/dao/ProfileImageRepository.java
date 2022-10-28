package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doccare.doccare.model.ProfileImage;
import com.doccare.doccare.model.User;

public interface ProfileImageRepository extends JpaRepository<ProfileImage,Long>{
    public ProfileImage findByUser(User user);
}
