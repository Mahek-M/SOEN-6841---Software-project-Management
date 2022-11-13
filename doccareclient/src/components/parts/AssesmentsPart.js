import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import "./AssesmentPart.scss";

const AssesmentsPart = (props)=> {
    const {username} = useParams();

    const [assesment,setAssesment] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/assesments?username="+username.split(":")[1], {
            headers : {
                'authorization' : "Bearer " + localStorage.getItem("token")
            }
        }).then (res=> {
            console.log(res.data);
           setAssesment(res.data);
        });
    
    });

    return (
        <table className = "assesment-part-container">
            <thead>
                <tr><th>Question</th><th>Option</th></tr>
            </thead>
            <tbody>
                {(assesment != null) ? assesment.map(item => (<tr><td>{item.question}</td><td>{item.option}</td></tr>)) : <></>}
            </tbody>
            
        </table>
    );
}

export default AssesmentsPart;