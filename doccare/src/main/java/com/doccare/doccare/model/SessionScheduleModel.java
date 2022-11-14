package com.doccare.doccare.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SessionScheduleModel {
    String doctorId;
    String dateString;
    String hour;
    String minute;
}
