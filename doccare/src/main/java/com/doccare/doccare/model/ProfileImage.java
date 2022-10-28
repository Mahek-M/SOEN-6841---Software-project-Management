package com.doccare.doccare.model;

import java.sql.Blob;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "profile_image")
@Getter
@Setter
@NoArgsConstructor
public class ProfileImage {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "image")
    @Lob
    private String image;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="user_id")
    @JsonBackReference
    private User user;

}
