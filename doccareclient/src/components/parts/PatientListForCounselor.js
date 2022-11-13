import axios from "axios";
import React, { useEffect, useState } from "react";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

import "./PatientListForManager.scss";

const PatientListForCounselor = ()=> {
    const [patientList, setPatientList] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/patients",{
                    headers: {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    setPatientList(res.data);
                    
                });
    });

    return (
        <div className = "patient-list-container">
            {
                (patientList !=null) ? patientList.map(item=> (<PatientCounselorCard image = {(item.profileImage != null)?item.profileImage.image:""} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" id = {item.email} card_type = ""/>)): <></>
            }
            {/* <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/>
            <PatientCounselorCard designation = "Patient" name = "Natasha" card_type = "remove"/> */}
        </div>
    );
}

export default PatientListForCounselor;