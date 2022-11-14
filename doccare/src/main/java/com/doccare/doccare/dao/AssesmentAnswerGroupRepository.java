package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.AssesmentAnswerGroup;

@Repository
public interface AssesmentAnswerGroupRepository extends JpaRepository<AssesmentAnswerGroup,Long> {
    
}
