package com.doccare.doccare.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "asses_ans_group")
@Getter
@Setter
@NoArgsConstructor
public class AssesmentAnswerGroup {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "assesmentAnswerGroup")
    @JsonManagedReference
    private List<AssesmentAnswer> assementAnsList;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
