import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useState,useReducer } from 'react';

import eye from "../../assets/svg/eye.svg";
import hideEye from "../../assets/svg/hideeye.svg";

import { store,loggedIn,loggedOut } from '../util/ApplicationContext';


import "./Signin.scss";

const Signin = ()=> {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [eyeIconState,setEyeIconState] = useState(false);
    const [otpCode,setOtpCode] = useState("");
    const [otpCodeUserProvided,setOtpCodeUserProvided] = useState("");
    const [passError,setPasswordError] = useState(false);
    // const [userRole,setUserRole] = useState("");

    const eyeIconReducer = (state,action) => {
        switch (action.type) {
            case true: 
                setEyeIconState(true);
                break;
            case false:
                setEyeIconState(false);
                break;
        }
    }
    const [eyeIcon,eyeIconDispatcher] = useReducer(eyeIconReducer,eyeIconState);


    const signin = async (event)=> {
        event.preventDefault();
        // alert("Hello world ");
        // send the http request to the server with `POST` method
        axios.get("http://localhost:4445/api/v1/userexists?username="+email).then(res=>{
            if (res.data == "199") {
                
                return;
            }
        });

        await axios.get("http://localhost:4445/api/v1/role?username="+email).then(res=> {
            localStorage.setItem("role_temp",res.data);
            
            // res.data = "doctor";
            // alert("the right after localstoreage get populated "+localStorage.getItem("role_temp"));
            // alert(localStorage.getItem("role_temp")+ " yo yo");
            if (res.data === "doctor" || res.data === "counselor" || res.data == "manager") {
                document.getElementById("mainform").style.display = "none";
                document.getElementById("otp").style.display = "flex";

                axios.get("http://localhost:4445/api/v1/generateotp?username="+email)
                .then (res=> {
                    console.log(res.data);
                    setOtpCode(res.data);
                });

            }
        });

        // alert(localStorage.getItem("role_temp"));

        // alert("entering to the manager ");
        if (localStorage.getItem("role_temp") === "patient") {
            // alert("manager found");
            //
            axios.post("http://localhost:4445/api/v1/authenticate", {
                "username":email,
                "password":password
            },{withCredentials:false}).then(res=>{
                localStorage.removeItem("token");
                localStorage.setItem("token",res.data.bearer);
                localStorage.setItem("exp",res.data.expireDate);

                // localStorage.setItem("role",res.data.access_token.role);
                if (res.data.bearer == null) {
                    setPasswordError(true);
                }
                console.log(res.data.bearer);
                // window.open("/","_self");


                axios.get("http://localhost:4445/api/v1/me", {
                    headers:{
                        'authorization' : "Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res.data.role[0].role);
                    localStorage.setItem("name",res.data.name);
                    localStorage.setItem("role",res.data.role[0].role);
                    localStorage.setItem("isLoggedIn",true);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("address",res.data.address.address);
                    localStorage.setItem("id",res.data.id);

                    // clean up the role_temp
                    // localStorage.removeItem("role_temp");

                    axios.get("http://localhost:4445/api/v1/getProfileImg?username="+email, {
                        headers:{
                            'authorization' : "Bearer "+localStorage.getItem("token")
                        }
                    }).then(res => {
                        localStorage.setItem("profileImage",res.data);
                        // window.location.reload();
                        window.location = "/";
                    });


                });


            }).catch(e=>{
                console.log(e);
                
            });


        }
                
        
    }

    const [emailError,setEmailError] = useState(false);
    

    const setEmailToState  = async(event) => {

        await axios.get("http://localhost:4445/api/v1/userexists?username="+event.target.value).then(res=>{
            if (res.data == "200") {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
        })
        

        setEmail(event.target.value);
    }
    const setPasswordToState  =(event) => {
        setPasswordError(false);
        setPassword(event.target.value);
    }
    const setOtpCodeUserProvidedToState = (event)=> {
        setOtpCodeUserProvided(event.target.value);
    }

    // const setUserRoleState = (role)=>{
    //     setUserRole(role);
    // }

    const toogleEyeIcon = (event)=> {
        if(!eyeIconState) {

            document.getElementById("pass").type ="text"
            event.target.src = hideEye;


            eyeIconDispatcher({type:true});
        } else {
            document.getElementById("pass").type ="password"
            event.target.src = eye;
            eyeIconDispatcher({type:false});
        }
    }

    const submitOtp = (event)=> {
        event.preventDefault();

        var splitedOtpCode = otpCode.split(".")[0];
        if (splitedOtpCode === otpCodeUserProvided) {
            axios.post("http://localhost:4445/api/v1/authenticate", {
                "username":email,
                "password":password
            },{withCredentials:false}).then(res=>{
                localStorage.removeItem("token");
                localStorage.setItem("token",res.data.bearer);
                localStorage.setItem("exp",res.data.expireDate);

                // localStorage.setItem("role",res.data.access_token.role);
                if (res.data.bearer == null) {
                    // alert("password or user name has issue"); 
                    // also we need to show the error msg
                    return;
                }
                console.log(res.data.bearer);
                // window.open("/","_self");


                axios.get("http://localhost:4445/api/v1/me", {
                    headers:{
                        'authorization' : "Bearer "+localStorage.getItem("token")
                    }
                }).then(res => {
                    // console.log(res.data.role[0].role);
                    console.log(res.data);
                    localStorage.setItem("name",res.data.name);
                    localStorage.setItem("role",res.data.role[0].role);
                    localStorage.setItem("isLoggedIn",true);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("address",res.data.address.address);
                    localStorage.setItem("id",res.data.id);


                    localStorage.setItem("docRegNo",res.data.docRegNo);
                    localStorage.setItem("conRegNo",res.data.counselorRegNo);


                    // clean up the role temp
                    // localStorage.removeItem("role_temp");

                    axios.get("http://localhost:4445/api/v1/getProfileImg?username="+email, {
                        headers:{
                            'authorization' : "Bearer "+localStorage.getItem("token")
                        }
                    }).then(res => {
                        localStorage.setItem("profileImage",res.data);
                        // window.location.reload();
                        window.location = "/";
                    });

                });


            }).catch(e=>{
                console.log(e);
               

            });
        } else {
            alert("You have entered a invalid otp");
        }
        
    }

    useEffect(()=> {
        if (email === "" ) {
            document.getElementById("email-error").style.display = "none";

        } else {
            if(emailError) {
                document.getElementById("email-error").style.display = "none";
            } else {
                document.getElementById("email-error").style.display = "inline-block";
            }
        }

        if (passError) {
            document.getElementById("pass-error").style.display = "inline-block";
        } else {
            document.getElementById("pass-error").style.display = "none";
        }
    });
    return (
        <div className = "signin-container">

           <form id = "mainform" className ="signin-container__signin-form" style ={{"position":"relative"}}>
            <h3 style = {{"color":"white","position":"absolute","top":"1rem"}}>----- Signin -----</h3>
                <input className = "signin-container__signin-form__form-control" onChange={setEmailToState} type = "email" name = "email" placeholder='Enter your email'/>
                <span id = "email-error" style ={{"display":"none","color":"red"}} >Email does not exists !!</span>
                <div className = "psw">
                    <input id = "pass" className = "signin-container__signin-form__form-control" onChange={setPasswordToState} type = "password" name = "password" placeholder='Enter your password'/>
                    <img src= {eye} alt = "Something went wrong" className = "eye-icon" onClick={toogleEyeIcon}/>
                </div>
                <span id ="pass-error" style={{"display":"none","color":"red"}}>Password is not correct!!</span>
                <input className = "signin-container__signin-form__form-control" type = "submit" value = "Signin" onClick={signin}/>

           </form>

           <form className ="signin-container__signin-form" id ="otp" style = {{"display":"none"}}>
                <input type = "text" className = "signin-container__signin-form__form-control" placeholder='Enter your otp code' onChange={setOtpCodeUserProvidedToState} />
                <input className = "signin-container__signin-form__form-control" type = "submit" value = "Submit" onClick={submitOtp}/>
           </form>
           <Link to = "/signup">Don't have any account ? signup</Link>
           <Link to = "/forgetpass">Forgot password ?</Link>

        </div>
    );
}

export default Signin;