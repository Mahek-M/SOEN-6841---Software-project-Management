import React from "react";
import { useState,useReducer,useEffect } from "react";
import { Link, Navigate, NavLink, redirect, Route, Routes } from "react-router-dom";

import "./AdminPanel.scss";
import profile from "../../assets/images/profile.jpg";
import logoutBtn from "../../assets/svg/power.svg";
import settingBtn from "../../assets/svg/setting.svg";
import closeIcon from "../../assets/svg/cancel.svg";

import CounselorListForPatientAdminPanel from "./CounselorListForPatientAdminPanel";

import AppoinmentPatientList from "./ApppoinmentPatientList";

import AppointedpatientForCounselor from "./AppointedPatientListForCounselor";
import DoctorListForManager from "./DoctorListForManager";
import DoctorListForCounselor from "./DoctorListForCounselor";

import PatientListForManager from "./PatientListForManager";
import PatientListForCounselor from "./PatientListForCounselor";

import CounselorListForManager from "./CounselorListForManager";
import Setting from "./Setting";
import UnderDevelopment from "./UnderDevelopment";
import AppointedpatientForCounselorCon from "./AppointedPatientListForCounselorCon";
import axios from "axios";
import AssesMentPage from "./AssesmentPage";
import AvailableDocForCounselor from "./AvailableDocForCounselor";
import AppointedPatientForDoctor from "./AppointedPatientForDoctor";

import AppointedPatientDoctorForCounselor from "./AppointedPatientDoctorForCounselor";
import MyHistory from "./MyHistoryPart";
import AppoinmentHistoryForPatient from "./AppoinmentHistoryForPatient";
import AppoinmentHistoryForDoctor from "./AppoinmentHistoryForDoctor";
import AssesmentsPart from "./AssesmentsPart";
import AppointedPatientForCounselor2 from "./AppointedPatientForCounselor2";



const AdminPanel = ()=> {
    const [profileImage, setProfileImage] = useState(null);
    const [userType, setUserType] = useState("");
    const [bgColor , setBgColor] = useState("#558D96");
    const [isAssesmentExists,setIsAssesmentExists] = useState(false);

    var color = {
        "background-color":"#558D96"
    };

    const logout = ()=> {
        localStorage.removeItem("token");
        localStorage.removeItem("exp");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("name");

        localStorage.removeItem("role_temp");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("email");
        localStorage.removeItem("address");

        // window.location.reload();
        window.location = "/";
    }

    const userTypeReducer = (state,action)=> {
        switch(action.type) {
            case "doctor":
                setUserType("doctor");
                setBgColor("#558D96");
                break;
            case "patient":
                setUserType("patient");
                setBgColor("#558D96");
                break;
            case "counselor":
                setUserType("counselor");
                setBgColor("#558D96");
                break;

            case "manager":
                setUserType("manager");
                setBgColor("#0D2557")
                break;
        }
    }
    const [userTypeRed,userTypeDispatcher] = useReducer(userTypeReducer,"patient"); // by default the page will be for patient if there is no special state occure

    useEffect(()=> {
        userTypeDispatcher({"type":localStorage.getItem("role")});

        document.getElementById("panel-name").textContent = localStorage.getItem("name");

        axios.get("http://localhost:4445/api/v1/isassesmentavail",{headers :{
            'authorization': "Bearer "+localStorage.getItem("token")
        }}).then(res => {
            // alert(res.data);
            setIsAssesmentExists(res.data);
        });
    });

    const showModal = ()=> {
        document.getElementById("modal-box").style.display = "flex";
    }

    const closeModal = ()=> {
        document.getElementById("modal-box").style.display = "none";
    }

    const addNewDoctor = (event)=> {
        event.preventDefault();
    }
    
    const [prevNavItem, setPrevNavItem] = useState(null);

    const toggleNavItem =(event)=> {
        if (prevNavItem != null) {
            prevNavItem.target.style.border = "none";
            // prevNavItem.target.onmouseover = function(){
            //     this.style.borderBottom = "3px solid white";
            // }

            prevNavItem.target.onmouseleave = function(){
                this.style.borderBottom = "none";
            }
        }
        event.target.style.borderBottom = "3px solid white";
        setPrevNavItem(event);
    }

    return (
        <div className = "admin-panel-container">
            <div className ="admin-panel-container__left-side" style = {{"background-color":bgColor}}>
                <div className = "admin-panel-container__left-side__image-designation-grp">
                    <img src = {"data:image/jpeg;charset=utf-8;base64,"+localStorage.getItem("profileImage")} alt = "something went wrong" className = "admin-panel-container__left-side__image-designation-grp__profile-img"/>
                    {(userType === "patient") ? <h4>Patient</h4> : <></>}
                    {(userType === "doctor") ? <h4>Doctor</h4> : <></>}
                    {(userType === "counselor") ? <h4>Counselor</h4> : <></>}
                    {(userType === "manager") ? <h4>Manager</h4> : <></>}
                    <h2 style ={{"color":"white"}} id = "panel-name"></h2>
                </div>
                {(userType === "patient") ? <div className = "admin-panel-container__left-side__nav">
                    {(isAssesmentExists) ? <></> : <NavLink to = "/fillassesment" end className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Fill assesment</NavLink>}
                    <NavLink to = "/history" end className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Appoinment History</NavLink>
                    <NavLink to = "/myappoinment"  className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>My Appoinments</NavLink>
                    
                </div> : <></>}

                {(userType === "doctor") ? <div className = "admin-panel-container__left-side__nav">
                    <NavLink to = "/" end className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Appoinment Requests</NavLink>
                    {/* <Link to = "/appointedpatients">Appointed patients</Link> */}
                    <NavLink to = "/patients" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Patients</NavLink>
                    <NavLink to = "/history" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Appoinment History</NavLink>
                    
                </div> : <></>}

                {(userType === "counselor") ? <div className = "admin-panel-container__left-side__nav">
                    <NavLink to = "/" end className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Patients</NavLink>
                    <NavLink to = "/request" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Appoinment request</NavLink>
                    <Link to = "/appointedpatients">Appointed Patients</Link>
                    <NavLink to = "/doctors" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Doctors</NavLink>
                    
                </div> : <></>}

                {(userType === "manager") ? <div className = "admin-panel-container__left-side__nav">
                    <NavLink to = "/report" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Reports</NavLink>
                    <NavLink to = "/doctors" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Doctors</NavLink>
                    <NavLink to = "/patients" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Patients</NavLink>
                    <NavLink to = "/counselors" className = {({ isActive }) =>isActive ? 'admin-panel-container__left-side__nav__active' : 'admin-panel-container__left-side__nav__inactive'}>Counselors</NavLink>
                </div> : <></>}

                <div className = "admin-panel-container__left-side__bottom-btn-grp">
                    <img onClick={logout} src = {logoutBtn} alt = "something went wrong"/>
                    <Link to = "/setting"><img src = {settingBtn} alt = "something went wrong"/></Link>
                </div>
            </div>
            <div className ="admin-panel-container__right-side">
                {/* {(userType === "manager") ? 
                <div className = "admin-panel-container__right-side__add-new-doctor">
                <button onClick={showModal}>Add New Doctor</button>
            </div>: <></>} */}
                {/* <CounselorListForPatientAdminPanel/> */}
                {/** This is the modal windows for the add new doctor dialog bar */}
                <div className = "admin-panel-container__right-side__modal-box" id ="modal-box">
                    <div className = "admin-panel-container__right-side__modal-box__container">
                        <img src = {closeIcon} alt = "Something went wrong" onClick={closeModal}/>
                        <div className = "admin-panel-container__right-side__modal-box__container__heading">Add New Doctor</div>
                        
                        <form className = "admin-panel-container__right-side__modal-box__container__modal-form">
                            <input type ="text" required name = "name" placeholder="Enter the full name" className = "admin-panel-container__right-side__modal-box__container__modal-form__form-control"/>
                            <input type ="password" required name = "password" placeholder="Enter the password" className = "admin-panel-container__right-side__modal-box__container__modal-form__form-control"/>
                            <input type ="password" required placeholder="Retype the password" className = "admin-panel-container__right-side__modal-box__container__modal-form__form-control"/>
                            <input type ="email" name = "email" required placeholder="Enter the full email" className = "admin-panel-container__right-side__modal-box__container__modal-form__form-control"/>
                            <input type = "submit" value = "Add Doctor" className="admin-panel-container__right-side__modal-box__container__modal-form__form-control" onClick={addNewDoctor}/>
                        </form>
                    </div>
                </div>

                {/* {(userType === "patient") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    <Route path = "/counselors" element = {<CounselorListForPatientAdminPanel/>}/>
                    <Route path = "/history" element = {<AppoinmentHistoryForPatient/>}/>
                    <Route path = "/myappoinment" element = {<PatientAppoinmentList/>}/>

                    </Routes> : <></>}

                {(userType === "doctor") ? <Routes>
                <Route path = "/setting" element = {<Setting/>}/>

                <Route path = "/patients" element = {<AppoinmentPatientList/>}/>
                <Route path = "/history" element = {<AppoinmentHistoryForDoctor/>}/>
                <Route path = "/appointedpatients" element = {<AppointedPatientForDoctor/>}/>

                </Routes> : <></>}

                {(userType === "counselor") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    <Route path = "/patients" element = {<AppointedpatientForCounselor/>}/>
                    <Route path = "/history" element = {<AppoinmentHistoryForDoctor/>}/>
                    <Route path = "availabledoc" element = {<AvailableDocForCounselor/>}/>
                    <Route path = "/appointedpatients" element = {<AppointedPatientDoctorForCounselor/>}/>
                </Routes> : <></>}

                {(userType === "manager") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    <Route path = "/patients" element = {<AppointedpatientForCounselor/>}/>
                    <Route path = "/doctors" element = {<DoctorListForManager/>}/>
                    <Route path = "patients" element = {<PatientListForManager/>}/>
                    <Route path = "/counselors" element = {<CounselorListForManager/>}/>
                </Routes> : <></>} */}
                
                {(userType === "patient") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    {/* <Route path = "/" element = {(isAssesmentExists) ? <CounselorListForPatientAdminPanel/> : <AssesMentPage/>}/> */}
                    <Route path = "/" element = {(isAssesmentExists) ? <Navigate to = "/history" replace = {true}/> : <Navigate to = "/fillassesment" replace = {true}/> }/>
                    <Route path = "/history" element = {<AppoinmentHistoryForPatient/>}/>
                    <Route path  = "/fillassesment" element = {(isAssesmentExists) ? <Navigate to = "/" replace = {true}/> : <AssesMentPage/>}/>
                    <Route path = "/myappoinment" element = {<UnderDevelopment/>}/>
                    

                    </Routes> : <></>}

                {(userType === "doctor") ? <Routes>
                <Route path = "/setting" element = {<Setting/>}/>

                <Route path = "/" element = {<AppoinmentPatientList assesment = {true}/>}/>
                
                <Route path = "/appointedpatients" element = {<AppointedPatientForDoctor/>}/>
                <Route path = "/patients" element = {<PatientListForCounselor/>} />
                <Route path = "/history" element = {<AppoinmentHistoryForDoctor/>}/>
                <Route path = "/assesments:username" element = {<AssesmentsPart role = "doctor"/>}/>



                </Routes> : <></>}

                {(userType === "counselor") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    <Route path = "/" element = {<PatientListForCounselor/>}/>
                    <Route path = "/request" element = {<AppointedpatientForCounselor assesment = {true}/>}/>

                    <Route path = "/history" element = {<UnderDevelopment/>}/>
                    <Route path = "availabledoc:patientId" element = {<AvailableDocForCounselor/>}/>
                    {/* <Route path = "/appointedpatients" element = {<AppointedPatientDoctorForCounselor/>}/> */}
                    <Route path = "/appointedpatients" element = {<AppointedPatientForCounselor2/>}/>

                    <Route path = "/doctors" element = {<DoctorListForCounselor/>}/>
                    <Route path = "/assesments:username" element = {<AssesmentsPart role = "counselor"/>}/>

                    
                </Routes> : <></>}

                {(userType === "manager") ? <Routes>
                    <Route path = "/setting" element = {<Setting/>}/>

                    <Route path = "/" element = {<AppointedpatientForCounselorCon/>}/>
                    <Route path = "/doctors" element = {<DoctorListForManager/>}/>
                    <Route path = "/patients" element = {<PatientListForManager/>}/>
                    <Route path = "/counselors" element = {<CounselorListForManager/>}/>
                </Routes> : <></>}
            </div>



        </div>
    );
}

export default AdminPanel;