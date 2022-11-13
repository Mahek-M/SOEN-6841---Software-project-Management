import React, { useEffect, useState } from "react";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

import "./AppoinmentPatientList.scss";
import axios from "axios";

const AppoinmentPatientList = (props)=> {

    const [patientList, setPatientList] = useState([]);

    useEffect(()=> {
        // "http://localhost:4445/api/v1/patients"
        axios.get("http://localhost:4445/api/v1/getassignedpatlist",{
                    headers: {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    setPatientList(res.data);
                    // console.log(res.data[0].id);
                    
                });
    });

    return (
        <div className = "appoinment-patient-list-container">
            {
                
                (patientList !=null) ? patientList.map(item=> (<PatientCounselorCard id = {item.email} assesment = {props.assesment} image = {(item.profileImage != null) ? item.profileImage.image : ""} docId = {localStorage.getItem("id")} patientId = {item.id} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" card_type = "patient"/>)): <></>
            }
            {/* <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/>
            <PatientCounselorCard designation="Patient" name = "John Doe" qualification = "" card_type = "patient"/> */}

        </div>
    );
}

export default AppoinmentPatientList;