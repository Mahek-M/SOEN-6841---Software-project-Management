import React, { useState } from "react";
import "./Signin.scss";
import "./ForgetPasswordPart.scss";
import axios from "axios";

const ForgetPasswordPart = ()=> {
    const [email, setEmail] = useState("");
    const forgetPassword = async (event)=> {
        event.preventDefault(); 
        


        const params = new URLSearchParams({
            username: email,
          }).toString();

        //   alert(email);

          
        
        await axios.get("http://localhost:4445/api/v1/forgetpassword?"+params, {
           
            },{withCredentials:false}).then(res=>{
            
                // localStorage.setItem("role",res.data.access_token.role);
                // window.open("/","_self");
                console.log(res);

            }).catch(e=>console.log(e));

            event.target.style.display = "none";
            document.getElementById("input").style.display = "none";
            document.getElementById("msg").style.display = "inline-block";

    }

    const setEmailState = (event)=> {
        event.preventDefault();
        setEmail(event.target.value);
    }

    return (
        <div className = "signin-container">
            <form className ="signin-container__signin-form">
                <input id = "input" className = "signin-container__signin-form__form-control" onChange={setEmailState} type = "email" name = "email" placeholder='Enter your email'/>
                <div id = "msg" className = "forget-password-msg">
                    <h4>We have sent you an email to your email address with a password reset link.</h4>
                </div>
                
                <input className = "signin-container__signin-form__form-control" type = "submit" value = "Reset password" onClick={forgetPassword}/>

            </form>
        

     </div>
    );
}

export default ForgetPasswordPart;