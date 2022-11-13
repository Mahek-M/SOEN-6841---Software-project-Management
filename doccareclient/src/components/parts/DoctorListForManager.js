import axios from "axios";
import React, { useEffect, useState } from "react";

import "./DoctorListForManager.scss";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

const DoctorListForManager = (props)=> {
    const [doctorsList, setDoctorList] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/doctors",{
                    headers: {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    setDoctorList(res.data);
                    
                });
    });

    const removeDoctor = (event)=> {
        alert(event.target.name);
    }

    return (
        <div className = "doctor-list-container">
            {/* {(props.userType === "manager") ? 
                <div className = "admin-panel-container__right-side__add-new-doctor">
                <button onClick={showModal}>Add New Doctor</button>
            </div>: <></>} */}

            {
                (doctorsList !=null) ? doctorsList.map(item=> (<PatientCounselorCard image = {item.profileImage.image} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" id = {item.email} card_type = "remove"/>)): <></>
            }
            
            {/* <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" />
            <PatientCounselorCard designation = "Doctor" name = "Dr. Natasha" card_type = "remove" qualification = "MBBS | PHD | Other degree" /> */}
        </div>
    );
}
export default DoctorListForManager;