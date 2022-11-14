package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.History;

@Repository
public interface HistoryRepository extends JpaRepository<History,Long>{
    
}
