import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AppoinmentHistoryCard from "./AppoinmentHistoryCard";

const AppointedPatientForCounselor2 = ()=> {
    const [history, setHistory] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/conhistory?username="+localStorage.getItem("email"),{ 
            headers: {
                'authorization' : "Bearer "+localStorage.getItem("token")
            }
        }).then(res=> {
            setHistory(res.data);
        })
    });
    return (
        <div>
            {(history != null) ? history.map(item => (<AppoinmentHistoryCard forwardedName = {item.forwardedName} forwardedRole = {item.forwardedRole} forwardedImage = {(item.forwardedImage != null) ? "data:image/jpeg;charset=utf-8;base64,"+item.forwardedImage : ""} name ={item.name} role = {item.role} img = {(item.image != null) ? "data:image/jpeg;charset=utf-8;base64,"+item.image : ""} status = {item.history} type = "history" />))  : <></>}

        </div>
    )
}

export default AppointedPatientForCounselor2;