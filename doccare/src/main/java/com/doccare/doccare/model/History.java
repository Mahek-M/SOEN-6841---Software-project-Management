package com.doccare.doccare.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "history")
@Getter
@Setter
@NoArgsConstructor
public class History {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "history")
    private String history;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    // @JsonBackReference
    @JsonIgnore
    private User user;

    @Column(name = "role")
    private String role;
    @Column(name= "name")
    private String name;
    @Column(name = "image")
    @Lob
    private String image;

    @Column(name = "forwarded_role", nullable =  true)
    private String forwardedRole;
    @Column(name ="forwarded_name", nullable =  true)
    private String forwardedName;
    @Column(name = "forwarded_image", nullable =  true)
    @Lob
    private String forwardedImage;

}
