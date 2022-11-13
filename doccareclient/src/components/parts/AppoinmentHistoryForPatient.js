import React from "react";
import AppoinmentHistoryCard from "./AppoinmentHistoryCard";

import sampleDoctorImage from "../../assets/images/doctor_card.jpg";
import "./AppoinmentHistoryForPatient.scss";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AppoinmentHistoryForPatient = ()=> {
    const [history, setHistory] = useState([]);
    useEffect(()=> {
        if (localStorage.getItem("role") === "patient") {
            axios.get("http://localhost:4445/api/v1/patienthistory?username="+localStorage.getItem("email"), {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                res.data.map(item => (console.log(item.image)));
                setHistory(res.data);
            });
        } else if(localStorage.getItem("role") === "doctor") {
            axios.get("http://localhost:4445/api/v1/dochistory?username="+localStorage.getItem("email"), {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                res.data.map(item => (console.log(item.image)));
                setHistory(res.data);
            });
        } else if (localStorage.getItem("role") === "counselor") {
            axios.get("http://localhost:4445/api/v1/conhistory?username="+localStorage.getItem("email"), {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                res.data.map(item => (console.log(item.image)));
                setHistory(res.data);
            });
        }
    });
    return (
        <div className ="appoinment-history-for-patient-container">
            {/* <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Cancelled" date = "25th sept 2022" type = "schedule" /> */}
            {(history != null) ? history.map(item => (<AppoinmentHistoryCard name ={item.name} role = {item.role} img = {(item.image != null) ? "data:image/jpeg;charset=utf-8;base64,"+item.image : ""} status = {item.history} type = "history" />))  : <></>}
            {/* <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Success" type = "history" />
            <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Success" type = "history" />
            <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Cancelled" type = "history" />
            <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Cancelled" type = "history" />
            <AppoinmentHistoryCard img = {sampleDoctorImage} status = "Success" type = "history" /> */}
        </div>
    );
}

export default AppoinmentHistoryForPatient;