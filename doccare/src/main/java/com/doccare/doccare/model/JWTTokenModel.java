package com.doccare.doccare.model;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JWTTokenModel {
    private String bearer;
    private String expireDate;

    public String getBearer() {
        return this.bearer;
    }

    public void setBearer(String bearer) {
        this.bearer = bearer;
    }

    
}
