package com.doccare.doccare.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doccare.doccare.model.DoctorPatientAssignedSessionModel;

@Repository
public interface DoctorPatientAssignedSessionModelRepository extends JpaRepository<DoctorPatientAssignedSessionModel,Long> {
    DoctorPatientAssignedSessionModel findByPatientUser(Long patientUserId);
    DoctorPatientAssignedSessionModel findByDoctorUser(Long doctorUserId);
}
