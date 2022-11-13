import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "./CounselorListForPatientAdminPanel.scss";

import PatientCounselorCard from "./PatientCounselorDoctorCard";


const CounselorListForPatientAdminPanel = ()=> {
    const [counselorList, setCounselorList] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/counselors",{
                    headers: {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    setCounselorList(res.data);
                    
                });
    });
    return (
        <div className = "counselor-list-for-patient-admin-panel__counselor-profile-grp">
            {
                (counselorList !=null) ? counselorList.map(item=> (<PatientCounselorCard image = {item.profileImage.image} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>)): <></>
            }
            {/* <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/>
            <PatientCounselorCard designation="Counselor" name = "Dr. Natasha" qualification = "PHD| MBBS |Other degree" card_type = "counselor"/> */}
        </div>
    );
}
export default CounselorListForPatientAdminPanel;