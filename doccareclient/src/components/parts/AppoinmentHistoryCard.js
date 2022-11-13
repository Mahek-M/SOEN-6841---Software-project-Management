import React from "react";

import "./AppoinmentHistoryCard.scss";
import cancelIcon from "../../assets/svg/cancel.svg";

const AppoinmentHistoryCard = (props)=> {
    return (
        <div className = "appoinment-history-card-container">
            <img src = {props.img} alt = "something went wrong" className = "appoinment-history-card-container__img"/>
            <div className = "appoinment-history-card-container__text-info">
                <h4>{props.name}</h4>
                {/* <span>MBBS | other Degree</span> */}
                <h4>{props.role}</h4>
            </div>

            {(props.forwardedRole === "doctor")? <>
                <img src = {props.forwardedImage} alt = "something went wrong" className = "appoinment-history-card-container__img"/>
                <div className = "appoinment-history-card-container__text-info">
                    <h4>{props.forwardedName}</h4>
                    {/* <span>MBBS | other Degree</span> */}
                    <h4>{props.forwardedRole}</h4>
                </div>
            </> :<></>}

            {(props.type === "history")?<div className = "appoinment-history-card-container__status">{props.status}</div> : <></> }
            {(props.type === "schedule" ? <div className ="appoinment-history-card-container__status">{props.date}</div> : <></>)}
            {(props.type === "schedule" ? <div className ="appoinment-history-card-container__cancel-btn"><img src = {cancelIcon}/></div> : <></>)}
        </div>
    );
}

export default AppoinmentHistoryCard;