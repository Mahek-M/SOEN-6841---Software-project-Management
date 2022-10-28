package com.doccare.doccare.model;

import java.sql.Blob;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImageBinaryModel {
    private Blob image;
}
