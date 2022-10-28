package com.doccare.doccare.model;

import java.sql.Blob;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateModel {
    private String username;
    private String name;
    private String address;

}
