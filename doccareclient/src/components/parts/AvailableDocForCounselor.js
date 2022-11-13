import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./AvailableDocForCounselor.scss";

import PatientCounselorDoctorCard from "./PatientCounselorDoctorCard";


const AvailableDocForCounselor = ()=> {
    const [availableDocList,setAvailableDocList] = useState([]);
    const {patientId} = useParams();


    useEffect(()=> {
        // alert(patientId.split(":")[1]);
        axios.get("http://localhost:4445/api/v1/getavailabledoclist",{
            headers : {
                'authorization' : "Bearer "+localStorage.getItem("token")
            }
        })
        .then(res => {
            setAvailableDocList(res.data);
            console.log(res);
        });
    });

    

    return (
        <div className = "available-doc-container">
            {
                // availableDocList.map(item => (<PatientCounselorDoctorCard designation={item.role[0].role} name = {item.name} qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>))
                (availableDocList !=null) ? availableDocList.map(item=> (<PatientCounselorDoctorCard conId = {localStorage.getItem("id")} patientId = {patientId.split(":")[1]} doctorId = {item.id}  image = {item.profileImage.image} designation={item.role[0].role} name = {item.name} qualification = "PHD| MBBS |Other degree" id = {item.email} card_type = "assigndoc"/>)): <></>
            }
            {/* <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/>
            <PatientCounselorDoctorCard designation="Doctor" name = "Dr. Natasha" qualification = "MBBS | PHD | Other degrees" card_type = "assigndoc"/> */}
        </div>
    ); 
}

export default AvailableDocForCounselor;