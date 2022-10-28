package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.CounselorRegModel;

@Repository
public interface CounselorRegNoRepository extends JpaRepository<CounselorRegModel,Long>{
    public CounselorRegModel findByRegNo(String regNo);
}
