package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doccare.doccare.model.AssesmentAnswer;

public interface AssesmentAnswerRepo extends JpaRepository<AssesmentAnswer,Long> {
    
}
