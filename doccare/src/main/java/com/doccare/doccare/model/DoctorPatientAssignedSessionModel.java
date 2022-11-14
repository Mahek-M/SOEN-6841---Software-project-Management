package com.doccare.doccare.model;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="doctor_patient_assigned_session")
@Getter
@Setter
@NoArgsConstructor
public class DoctorPatientAssignedSessionModel {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(name = "doctor_id", nullable = false)
    private Long doctorUser;

    @Column(name = "patient_id" , nullable =  false)
    private Long patientUser;
    @Column (name = "session_date", nullable =  true)
    private Timestamp sessionDate;
}
