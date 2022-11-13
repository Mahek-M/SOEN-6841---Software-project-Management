import React, { useEffect, useState } from "react";

import { redirect } from "react-router-dom";

import axios from 'axios';


import "./Signin.scss";
const ResetPassPart = ()=> {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get("code")
    const [redirectState,setRedirectState] = useState(false);
    const [password,setPassword] = useState("");
    

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/verifyforgetpassword?code="+code)
        .then(res=> (res.data == 199) ? setRedirectState(true) : setRedirectState(false));
    });

    if (code.length < 8) {
        window.location = "/";
    }

    const setPass = (event)=> {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const resetPass = (event)=> {
        event.preventDefault();
        // alert(password);
        const params = new URLSearchParams({
            code: code,
            password: password,
          }).toString();
        axios.get("http://localhost:4445/api/v1/resetpass?password="+password+"&code="+code, {
           
        },{withCredentials:false}).then(res=>{
           
            // localStorage.setItem("role",res.data.access_token.role);
            // window.open("/","_self");
            console.log(res);
            window.location = "/";

        }).catch(e=>console.log(e));
    }

   if (redirectState) {
    redirect("/");
    window.location = "/";
   } else {
    return (
        <div className = "signin-container">
            <form className ="signin-container__signin-form">
                <input id = "input" className = "signin-container__signin-form__form-control" type = "password" name = "email" placeholder='Type your password' onChange={setPass}/>
               
                
                <input className = "signin-container__signin-form__form-control" type = "submit" value = "Reset password" onClick={resetPass}/>

            </form>
        

     </div>

    );
   }
}

export default ResetPassPart;