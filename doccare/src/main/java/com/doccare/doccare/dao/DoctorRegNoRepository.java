package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.DoctorRegNo;

@Repository
public interface DoctorRegNoRepository extends JpaRepository<DoctorRegNo,Long>{
    public DoctorRegNo findByRegNo(String regNo);
}
