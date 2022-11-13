import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./AppoinmentHistoryForDoctor.scss";
import PatientCounselorCard from "./PatientCounselorDoctorCard";

const AppoinmentHistoryForDoctor = ()=> {
    const [history, setHisotry] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/dochistory?username="+localStorage.getItem("email"),{
            headers : {
                'authorization' : "Bearer "+localStorage.getItem("token")
            }
        }).then (res=> {
            console.log(res.data);
            setHisotry(res.data);
        })
    });

    return (
        <div className = "appoinment-history-container">
            {(history != null) ? history.map(item=> (<PatientCounselorCard image = {item.image} designation={item.role} name = {item.name} qualification = "" status = {item.history} card_type = "status"/>)) : <></>}
            {/* <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "schedule"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "schedule"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "schedule"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "schedule"/>
            <PatientCounselorCard designation="Patient" name = "Jhon doe" qualification = "" card_type = "schedule"/> */}
        </div>
    );
}

export default AppoinmentHistoryForDoctor;