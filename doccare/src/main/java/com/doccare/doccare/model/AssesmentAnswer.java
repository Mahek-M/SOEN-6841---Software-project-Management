package com.doccare.doccare.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "assesment_ans")
@Getter
@Setter
@NoArgsConstructor
public class AssesmentAnswer {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name ="question",length = 1000)
    private String question;
    @Column(name ="option")
    private String option;

    @ManyToOne
    @JoinColumn(name = "assesmentAnsGroup_id")
    @JsonBackReference
    private AssesmentAnswerGroup assesmentAnswerGroup;
    
}
