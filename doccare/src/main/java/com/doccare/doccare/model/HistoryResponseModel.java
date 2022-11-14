package com.doccare.doccare.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HistoryResponseModel {
    private String history;
    private User withUser;
}
