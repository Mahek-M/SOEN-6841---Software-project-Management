import React, { useEffect, useState } from "react";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

import "./CounselorListForManager.scss";
import axios from "axios";

const CounselorListForManager = ()=> {
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
        <div className = "counseor-list-container">
            {
                (counselorList !=null) ? counselorList.map(item=> (<PatientCounselorCard image = {item.profileImage.image} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" id = {item.email} card_type = "remove"/>)): <></>
            }
            
            {/* <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/>
            <PatientCounselorCard designation = "Counselor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degree" card_type = "remove"/> */}
        </div>
    );
}

export default CounselorListForManager;