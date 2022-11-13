import React from 'react';

import "./DoctorProfileCard.scss";
import doctor from "../../assets/images/doctor_card.jpg";

const DoctorProfileCard = (props)=> {
    const formateName = (name)=> {
        
        if (name.toUpperCase().includes("DR.")) {
            return name;
        } else {
            return "Dr. "+ name;
        }
    }
    return (
        <div className = 'doctor-profile-card-container'>
            <div className = "doctor-profile-card-container__image">
                <img src = {props.image} alt = "something went wrong"/>
            </div>
            <div>
                <h3 style = {{"margin-top" : "2rem","color":"white"}}>{formateName(props.name)}</h3>
            </div>
            

        </div>
    );
}

export default DoctorProfileCard;