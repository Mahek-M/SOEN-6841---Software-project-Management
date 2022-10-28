import React from "react";

import "./UserCardTemplate.scss";

import counselorImg from "../../assets/images/counselor.jpg";
import { Link } from "react-router-dom";
const PatientCounselorCard = (props)=> {
    const card_type = {
        counselor: "Get An Appoinment",
        forward: "Forward a patient",
        patient: "Accept request",
        schedule : "23th oct 2022",
        session : "End Session",
        assigndoc : "Assign this Doctor",
        remove : "Remove"
    };

    const getAnAppoinment = (counselorId)=> {
        // this function will be responsible for getting an appointment on the behalf of the patient
        alert("Trying to get an appoinment to this counselor !!");
    }

    /**
     * This function will assign a doctor to the patient based on the patient diseas.
     * @param {*} doctorId 
     */
    const assignADoctor = (doctorId)=> {
        alert ("Attempting assigning a doctor to this patient");
    }

    const acceptAnAppoinment = (patientId)=> {
        alert(patientId);
    }

    const cancelAnAppoinmentRequest = (appoinmentId)=> {

    }

    /**
     * This function will remove/ban an user from the system.
     * @param userId - patient/doctor/counselor id
     */
    const removeAnUser = (userId) => {
        alert("Attempting the removal");
    }

    /**
     * This function will end a specific meeting session between doctor and patient.
     * @param sessionId - id of the session
     */
    const endSession = (sessionId) =>{
        alert("Attempting to end the session");
    }

    return (
        <div className ="user-card-container">
            <img src = {"data:image/jpeg;charset=utf-8;base64,"+props.image} className ="user-card-container__img"/>
            <div className = "user-card-container__header">{props.designation}</div>
            <div className = "user-card-container__name">{props.name}</div> 
            {/* <div className = "user-card-container__qualification">{props.qualification}</div>  */}
            {(props.card_type === "patient")? <button className = "user-card-container__btn" onClick = {()=> acceptAnAppoinment(`${1}`)}>{card_type.patient}</button> : <></>}
            {(props.card_type === "forward")? <Link to = "/availabledoc" className = "user-card-container__btn">{card_type.forward}</Link> : <></>}
            {(props.card_type === "counselor")? <button className = "user-card-container__btn" onClick={()=> getAnAppoinment(`${1}`)}>{card_type.counselor}</button> : <></>}
            {(props.card_type === "schedule")? <button className = "user-card-container__btn">{card_type.schedule}</button> : <></>}
            {(props.card_type === "session")? <button className = "user-card-container__btn" onClick={endSession}>{card_type.session}</button> : <></>}
            {(props.card_type === "assigndoc")? <button className = "user-card-container__btn" onClick={assignADoctor}>{card_type.assigndoc}</button> : <></>}
            {(props.card_type === "remove")? <button className = "user-card-container__btn" onClick={removeAnUser}>{card_type.remove}</button> : <></>}




        </div>
    );

}
export default PatientCounselorCard;