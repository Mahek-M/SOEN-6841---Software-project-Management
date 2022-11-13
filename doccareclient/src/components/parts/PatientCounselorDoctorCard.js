import React, { useEffect } from "react";

import "./UserCardTemplate.scss";

import counselorImg from "../../assets/images/counselor.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { findAllInRenderedTree } from "react-dom/test-utils";

import dot from "../../assets/svg/dot.svg";
import { useState } from "react";


const PatientCounselorCard = (props)=> {
    const card_type = {
        counselor: "Get An Appoinment",
        forward: "Forward a doctor",
        patient: "Accept request",
        schedule : "23th oct 2022",
        session : "End Session",
        assigndoc : "Assign this Doctor",
        remove : "Remove",
        reject :"Reject",
        status : props.status

    };

    const getAnAppoinment = (counselorId)=> {
        // this function will be responsible for getting an appointment on the behalf of the patient
        alert("Trying to get an appoinment to this counselor !!");
    }

    /**
     * This function will assign a doctor to the patient based on the patient diseas.
     * @param {*} doctorId 
     */
    const assignADoctor = (doctorId,patientId,conId)=> {
        // alert(doctorId+patientId);
        var data = new FormData();
        data.set("doctorId",doctorId);
        data.set("patientId",patientId);
        
        axios.get("http://localhost:4445/api/v1/assigndoctor?doctorId="+doctorId+"&patientId="+patientId,{
            headers: {
                'authorization':"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res);

            axios.get("http://localhost:4445/api/v1/conforwardhistory?conId="+conId+"&conPatId="+patientId+"&docId="+doctorId,{
                headers : {
                    'authorization':"Bearer "+localStorage.getItem("token")
                }
            }).then (res=> {
                axios.get("http://localhost:4445/api/v1/patientforwardhistory?patientId="+patientId+"&docConId="+conId,{
                    headers : {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                })  
            })
        });
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
    const removeAnUser = async (userId) => {
        var data = new FormData();
        data.set("username", userId)
        await axios.delete("http://localhost:4445/api/v1/user?username="+userId, 
            {headers:{
                'authorization': "Bearer "+localStorage.getItem("token")
            }}
        ).then(res=> {
            // alert(res);
        });
    }

    const rejectAnUserByCon = async (userId,conId,patId)=> {
        // alert(userId);
        await axios.delete("http://localhost:4445/api/v1/rejectfromcon?username="+userId, {
            headers : {
                'authorization' : 'Bearer '+localStorage.getItem("token")
            }
        }).then(res => {
            axios.get("http://localhost:4445/api/v1/concancelhistory?conId="+conId+"&conPatId="+patId,{
                headers : {
                    'authorization':"Bearer "+localStorage.getItem("token")
                }
            }).then (res=> {
                axios.get("http://localhost:4445/api/v1/patientcancelhistory?patientId="+patId+"&docConId="+conId,{
                    headers : {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                })  
            })
        })
    }

    const rejectAnUserByDoc = async (patientId,docId)=> {
        
        
        await axios.delete("http://localhost:4445/api/v1/rejectpatientbydoctor", {
            headers : {
                'authorization' : 'Bearer '+localStorage.getItem("token")
            }
        }).then(async res => {

            await axios.get("http://localhost:4445/api/v1/doccancelhistory?docId="+docId+"&patConId="+patientId,{
                headers : {
                    'authorization':"Bearer "+localStorage.getItem("token")
                }
            }).then (res=> {
                debugger;
                axios.get("http://localhost:4445/api/v1/patientcancelhistory?patientId="+patientId+"&docConId="+docId,{
                    headers : {
                        'authorization':"Bearer "+localStorage.getItem("token")
                    }
                })  
            })


            window.location = "/";
        });
    }

    /**
     * This function will end a specific meeting session between doctor and patient.
     * @param sessionId - id of the session
     */
    const endSession = (sessionId) =>{
        alert("Attempting to end the session");
    }

    const [assesment,setAssesment] = useState([]);

    const viewAssesment = async ()=> {
        await axios.get("http://localhost:4445/api/v1/assesments?username="+props.id, {
            headers : {
                'authorization' : "Bearer " + localStorage.getItem("token")
            }
        }).then (res=> {
            console.log(res.data);
           setAssesment(res.data);
           document.getElementById("modal").style.display = "block";
        });
    }

    const closeModal = ()=> {
        document.getElementById("modal").style.display = "none";
    }

    useEffect(()=> {
        // alert(props.assesment);
    });

    return (
        <div className ="user-card-container">
            {((props.assesment)) ? <div>
            <div className = "user-card-container__assesment-modal" id = "modal">
                <button style = {{
                    "position" : "absolute",
                    "right" : "0.4rem",
                    "top":"0.4rem",
                    "background-color":"red",
                    "color" : "white",
                    "font-weight":"800",
                    "border":"none",
                    "padding" : ".2rem",
                    "cursor" : "pointer"
                }} onClick={closeModal}>Close</button>
                <div className= "user-card-container__assesment-modal__table-header"><h5>Question</h5><h5>Option</h5></div>
                {(assesment != null) ? assesment.map(item=> (<div className= "user-card-container__assesment-modal__table-body"><span>{item.question}</span><span style = {{
                    "height" : "4rem",
                    "width" : "1rem",
                    "background-color": "white",
                    "margin-left":"1rem",
                    "margin-right":"1rem",
                }}></span><span>{item.option}</span></div>)) : <></>}

            </div>
            <div className = "user-card-container__drop-container">
                <img src = {dot} className = "user-card-container__drop-container__three-dot" alt = "something went wrong"/>
                
                <div className = "user-card-container__drop-container__drop-down">
                    <Link to = {"/assesments:"+props.id}>View assesment result</Link>
                </div>

            </div>
            </div> : <></>}
            
            
            <img src = {"data:image/jpeg;charset=utf-8;base64,"+props.image} className ="user-card-container__img"/>
            <div className = "user-card-container__header">{props.designation}</div>
            <div className = "user-card-container__name">{props.name}</div> 
            {/* <div className = "user-card-container__qualification">{props.qualification}</div>  */}
            {(props.card_type === "patient")? <button className = "user-card-container__btn" onClick = {()=> acceptAnAppoinment(`${1}`)}>{card_type.patient}</button> : <></>}
            {(props.card_type === "patient")? <button className = "user-card-container__btn" onClick = {()=> rejectAnUserByDoc(`${props.docId}`,`${props.patientId}`)}>Reject</button> : <></>}
            {(props.card_type === "forward")? <Link to = {"/availabledoc:"+`${props.patientId}`} className = "user-card-container__btn">{card_type.forward}</Link> : <></>}
            {(props.card_type === "counselor")? <button className = "user-card-container__btn" onClick={()=> getAnAppoinment(`${1}`)}>{card_type.counselor}</button> : <></>}
            {(props.card_type === "schedule")? <button className = "user-card-container__btn">{card_type.schedule}</button> : <></>}
            {(props.card_type === "session")? <button className = "user-card-container__btn" onClick={endSession}>{card_type.session}</button> : <></>}
            {(props.card_type === "assigndoc")? <button className = "user-card-container__btn" onClick={()=> assignADoctor(`${props.doctorId}`,`${props.patientId}`,`${props.conId}`)}>{card_type.assigndoc}</button> : <></>}
            {(props.card_type === "remove")? <button className = "user-card-container__btn" onClick={()=>removeAnUser(`${props.id}`)}>{card_type.remove}</button> : <></>}
            {(props.card_type === "forward")? <button className = "user-card-container__btn" onClick={()=>rejectAnUserByCon(`${props.id}`,`${props.conId}`,`${props.patientId}`)}>{card_type.reject}</button> : <></>}
            {(props.card_type === "status")? <button className = "user-card-container__btn">{card_type.status}</button> : <></>}

            




        </div>
    );

}
export default PatientCounselorCard;