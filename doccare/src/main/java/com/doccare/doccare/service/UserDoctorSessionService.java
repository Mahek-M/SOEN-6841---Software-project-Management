package com.doccare.doccare.service;

import java.sql.Timestamp;
import java.util.List;

import com.doccare.doccare.model.SessionScheduleModel;
import com.doccare.doccare.model.User;

public interface UserDoctorSessionService {
    public boolean assignPatientToDoctor(String doctorId, String patientId); // first priority
    public boolean rejectPatientByDoctor(); // second priority
    public Timestamp acceptPatientByDoctor(SessionScheduleModel sessionScheduleModel); // thrird priority
    public boolean endPatientDoctorSession(); // fourth priority
    public List<User> getAvailableDoctorList(); // Get all the doctor list are available for accept session.
    public List<User> getAssignedPatientList();
}
