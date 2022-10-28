package com.doccare.doccare.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name ="user")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;

    @Column(name = "name" , nullable = false)
    private String name;
    @Column(name = "password" , nullable = false)
    private String password;
    @Column(name = "email" , nullable = false)
    private String email;

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "user")
    @JsonManagedReference
    private Address address;

    @Column(name = "doc_reg_no", nullable = true)
    private String docRegNo;
    @Column(name = "counselor_reg_no", nullable = true)
    private String counselorRegNo;

    // @ManyToMany(fetch = FetchType.EAGER)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id" ,referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName ="id")
        
    )
    // @JsonManagedReference
    // @JsonIgnore
    private List<Role> role;

    @OneToOne(mappedBy = "user" ,cascade = CascadeType.ALL)
    @JsonManagedReference
    private ProfileImage profileImage; 

    @Column(name = "verification_code")
    private String verificationCode;
    @Column(name = "enabled", nullable = false)
    private boolean enabled;
    @Column(name ="otp_code")
    private String otpCode;
}
