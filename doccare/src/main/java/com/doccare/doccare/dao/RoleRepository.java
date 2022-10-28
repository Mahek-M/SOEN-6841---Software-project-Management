package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doccare.doccare.model.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
    
    public Role findByRole(String role);
}
