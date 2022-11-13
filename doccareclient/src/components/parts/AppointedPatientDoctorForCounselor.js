import React from "react";

import "./AppointedPatientDoctorForCounselor.scss";
import PatientDoctorAppointmentRelationCard from "./PatientDoctorAppoinmentRelationCard";

const AppointedPatientDoctorForCounselor = ()=> {
    return (
        <div className = "appointed-patient-doctor-container">
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
            <PatientDoctorAppointmentRelationCard/>
        </div>
    );
}

export default AppointedPatientDoctorForCounselor;