import React from "react";

import "./PatientDoctorAppoinmentRelationCard.scss";

import docImage from "../../assets/images/doctor_card.jpg";
import patientImage from "../../assets/images/patient.jpg";
import arrow from "../../assets/svg/arrow.svg";


const PatientDoctorAppointmentRelationCard = (props)=> {
    return (
        <div className = "patient-doctor-appoinment-container">
            <div className ="patient-doctor-appoinment-container__body">
                <img className = "patient-doctor-appoinment-container__body__doc-img" src = {docImage} alt = "Something went wrong" />
                <div className = "patient-doctor-appoinment-container__body__relation">
                    <span>26th Oct 2022</span>
                    <img src = {arrow} alt = "Something went wrong"/>
                </div>
                <img className = "patient-doctor-appoinment-container__body__patient-img" src = {patientImage} alt = "Something went wrong" />

            </div>
            <div className ="patient-doctor-appoinment-container__footer"><span>Dr. John Doe PHD | MBBS</span><span>Robert Bruce</span></div>

        </div>
    );
}

export default PatientDoctorAppointmentRelationCard;