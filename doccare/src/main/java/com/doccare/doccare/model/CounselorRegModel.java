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
@Table(name = "counselor_reg_table")
@Getter
@Setter
@NoArgsConstructor
public class CounselorRegModel {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "regno")
    private String regNo;
    
}
