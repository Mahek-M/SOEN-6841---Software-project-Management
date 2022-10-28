package com.doccare.doccare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "doctor_reg_no")
@Getter
@Setter
@NoArgsConstructor
public class DoctorRegNo {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "regno")
    private String regNo;
}
