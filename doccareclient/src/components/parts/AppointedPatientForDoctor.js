import React from "react";

import "./AppointedPatientForDoctor.scss";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

const AppointedPatientForDoctor = ()=> {
    return (
        <div className = "appointed-patient-container">
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "session"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "session"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "session"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "session"/>
        </div>
    );
}

export default AppointedPatientForDoctor;