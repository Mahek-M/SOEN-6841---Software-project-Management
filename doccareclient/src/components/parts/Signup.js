import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState,useReducer} from "react";
import { useSpring, animated } from 'react-spring'



import "./Signup.scss";

import userImg from "../../assets/images/user.png";
import eye from "../../assets/svg/eye.svg";
import hideEye from "../../assets/svg/hideeye.svg";

import { eventWrapper } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const Signup = ()=> {
    const [userRole,setUserRole] = useState(0);

    // States that holds user info and credentials
    const [profileImg,setProfileImg] = useState(null);
    const [password,setPassword] = useState("");
    const [rePassword,setRePassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [gender,setGender] = useState("");
    const [address1,setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [phone,setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [doctRegNumber,setDoctRegNumber] = useState("");
    const [counselorRegNumber,setCounselorRegNumber] = useState("");
    const [eyeIconState,setEyeIconState] = useState(false);
    const [docReg,setDocReg] = useState("");
    const [conReg,setConReg] = useState("");
    const [userRoleStr,setUserRoleStr] = useState("");





    const userRoleReducerFunc = (state, action)=> {
        switch (action.type) {
            case "doctor":
                setUserRole(1);
                break;
            case "counselor":
                setUserRole(2);
                break;
            case "patient":
                setUserRole(3);
                break;
        }
    }

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

    const [userRoleReducer,dispatch] = useReducer(userRoleReducerFunc,userRole);
    const [eyeIcon,eyeIconDispatcher] = useReducer(eyeIconReducer,eyeIconState);

    const selectOption = (event)=> {
        if(event == 1) {
            setUserRoleStr("patient");

            document.getElementById("option").style.display = "none";
            document.getElementById("option").style.transition = "display 1s";


            document.getElementById("form1").style.display = "flex";

        } else if(event == 2) {
            setUserRoleStr("doctor");

            document.getElementById("option").style.display = "none";
            document.getElementById("form1").style.display = "flex";
            dispatch({type:"doctor"});
        } else {
            setUserRoleStr("counselor");

            document.getElementById("option").style.display = "none";
            document.getElementById("form1").style.display = "flex";
            dispatch({type:"counselor"});
        }
    }

    const checkIfFieldsArePopulated = ()=> {
        if (rePassword === "") {
            document.getElementById("repass2-error").style.display = "inline-block";
            document.getElementById("repass-error").style.display = "none";

        } else {
            document.getElementById("repass2-error").style.display = "none";
        }
        
        if(password === "") {
            document.getElementById("pass-error").style.display = "block";
            // document.getElementById("pass-error").innerHTML = checkPasswordValidity(password);
            document.getElementById("pass-error").innerHTML = "Password can not be blank";

            
        } else {
            document.getElementById("pass-error").style.display = "none";

        }
            

        if (email === "") {
            document.getElementById("email-error").style.display = "inline-block";
            document.getElementById("email-exist-error").style.display = "none";
            
        } else {
            document.getElementById("email-error").style.display = "none";
            document.getElementById("email-exist-error").style.display = "none";

        }

        if (fullName === "") {
            document.getElementById("name-error").style.display = "inline-block";
            
        } else {
            document.getElementById("name-error").style.display = "none";

        }

        
    }

    const nextBtn = async (event)=> {
        event.preventDefault();
        
        checkIfFieldsArePopulated();

        if (password === "" || email === "" || fullName === "" || password != rePassword) {
            return;
        }

        document.getElementById("form1").style.display = "none";
        document.getElementById("form2").style.display = "flex";
    }

    const signup = (event)=> {
        event.preventDefault();


        // switch(userRole) {
        //     case 1:
        //         setUserRoleStr("doctor");
        //         break;
        //     case 2:
        //         setUserRoleStr("counselor");
        //         break;
        //     case 3:
        //         setUserRoleStr("patient");
        //         break;
        //     default:
        //         setUserRoleStr("manager");
        // }
        // alert(userRole);
        // alert(userRoleStr);

        if (userRole === 1) {
            checkIfFieldsArePopulated();
            if (password === "" || email === "" || fullName === "" || password != rePassword) {
                return;
            }
        }
        if (userRole === 2) {
            checkIfFieldsArePopulated();
            if (password === "" || email === "" || fullName === "" || password != rePassword) {
                return;
            }
        }
        
        
        axios.post("http://localhost:4445/api/v1/register", {
            
            
            email : email,
            name : fullName,
            password: password,
            address :{
                address: address1+address2
            },
            docRegNo: (userRole === 1)? docReg : null,
            counselorRegNo: (userRole ===2 ? conReg : null),
            "role": [
                {
                    "role": userRoleStr
                }
            ],
            "profileImage": profileImg,

           
            },{withCredentials:false}).then(res=>{
            
                // localStorage.setItem("role",res.data.access_token.role);
                // window.open("/","_self");
                console.log(res);
                // window.location = "/";
                var data = new FormData();
                data.set("username",email)
		        data.set("profileImage",profileImg);
                axios.post("http://localhost:4445/api/v1/profileImg", 
                    data, {headers:{
                        'Content-Type': 'multipart/form-data' // do not forget this 
                    }}
                ).then(res => {
                    document.getElementById("form1").style.display = "none";
                    document.getElementById("form2").style.display = "none";
                    document.getElementById("successmsg").style.display = "flex";
                });




            }).catch(e=>console.log(e));

        
    }

    const showTheProfileImage = (event)=> {
        setProfileImg(event.target.files[0]);
        document.getElementById("profile-img").src =  URL.createObjectURL(event.target.files[0]);
    }

    const checkPasswordValidity =(pass)=> {
        const regexSpecialCharacter = /[^\w\s]/;
        const regexNumber = /\d/;
        const regexCapitalWord = /[A-Z]/;
        var errorMessage = "";

        var isSpecialWord = pass.search(regexSpecialCharacter);
        var isNumber = pass.search(regexNumber);
        var isCapitalWord = pass.search(regexCapitalWord);
        var isRightLength = (pass.length < 8) ? -1 : 1;

        if(isSpecialWord === -1 || isNumber === -1 || isCapitalWord === -1 || isRightLength === -1) {
            errorMessage = "!! Password should be at least 8 characters,with symbol,capital letter and number";
        } else {
            errorMessage = null;
        }

        return errorMessage;
    }


    const [passError,setPassError] = useState(false);
    const [rePass,setRePassError] = useState(false);
    const [fullNameError,setFullNameError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [addressError,setAddressError] = useState(false);
    const [doctRegNumError,setDocRegNumError] = useState(false);
    const [conRegNumError,setConRegNumError] = useState(false);

    const getPassword = (event)=> {
        event.preventDefault();
        setPassword(event.target.value);

        if(checkPasswordValidity(event.target.value) == null) {
            setPassError(false);
        } else {
            document.getElementById("pass-error").style.display = "block";
            document.getElementById("pass-error").innerHTML = checkPasswordValidity(event.target.value);
            setPassError(true);
            return;
        }
    }
    const getRePassword = (event)=> {
        event.preventDefault();
        setRePassword(event.target.value);
        document.getElementById("repass2-error").style.display = "none";
        if (password != event.target.value) {
            // alert("Password is not matched please retype the password again");
            document.getElementById("repass-error").style.display = "inline-block";

            return;
        } else {
            document.getElementById("repass-error").style.display = "none";
        }
    }
    const getFullName = (event)=> {
        event.preventDefault();
        
        setFullName(event.target.value);
        document.getElementById("name-error").style.display = "none";
    }
    const getEmail = async (event)=> {
        event.preventDefault();
        setEmail(event.target.value);
        document.getElementById("email-error").style.display = "none";

        await axios.get("http://localhost:4445/api/v1/userexists?username="+event.target.value)
        .then(res => {
            if (res.data == "200") {
                // alert("This user is already registered!");
                document.getElementById("email-error").style.display = "none";
                document.getElementById("email-exist-error").style.display = "inline-block";
                return;
            } else {
                document.getElementById("email-exist-error").style.display = "none";
            }
        });
    }
    const getGender = (event)=> {
        // event.preventDefault();
        setGender(event.target.value);
    }
    const getAddress1 =(event)=>{
        event.preventDefault();
        setAddress1(event.target.value);
    }
    const getAddress2 = (event)=> {
        event.preventDefault();
        setAddress2(event.target.value);
    }
    const getPhone = (event)=>{
        event.preventDefault();
        setPhone(event.target.value);
    }
    const getDateOfBirth = (event)=>{
        event.preventDefault();
        setDateOfBirth(event.target.value);
    }
    const getDoctRegNumber = (event)=> {
        event.preventDefault();
        setDoctRegNumber(event.target.value);
    }
    const getCounselorRegNumber = (event)=>{
        event.preventDefault();
        setCounselorRegNumber(event.target.value);
    }

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

    const toogleEyeIcon2 = (event)=> {
        if(!eyeIconState) {

            document.getElementById("pass2").type ="text"
            event.target.src = hideEye;


            eyeIconDispatcher({type:true});
        } else {
            document.getElementById("pass2").type ="password"
            event.target.src = eye;
            eyeIconDispatcher({type:false});
        }
    }

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/docreg",{headers:{'authenticate':"Bearer "+localStorage.getItem("token")}})
        .then(res => {
            console.log(res.data.regNo);
            setDocReg(res.data.regNo);
        });

        axios.get("http://localhost:4445/api/v1/conreg",{headers:{'authenticate':"Bearer "+localStorage.getItem("token")}})
        .then(res => {
            console.log(res.data.regNo);
            setConReg(res.data.regNo);
        });

        if(passError) {
            document.getElementById("pass-error").style.display = "inline-block";
        } else {
            document.getElementById("pass-error").style.display = "none";
        }
    });

    return (
        <div className = "signin-container">
            <div className = "signup-option-container" id = "option">
                <div className = "signup-option-container__user-option" onClick={()=>selectOption(1)}>I am a patient</div>
                <div className = "signup-option-container__user-option" onClick={()=>selectOption(2)}>I am a doctor</div>
                <div className = "signup-option-container__user-option" onClick={()=>selectOption(3)}>I am a counselor</div>
            </div>

            <form className = "signup-form" id = "form1" style = {{"display":"none","position":"relative"}}>
                <h3 style = {{"color":"white","position":"absolute","top":"0.5rem"}}>----- Signup -----</h3>
                <div className = "signup-form__img">
                    <label for = "img"><img id ="profile-img" src = {userImg}/></label> 
                    <input id ="img" type = "file" name = "img" onChange={showTheProfileImage}/>
                </div>

                {(userRole === 1)?<strong style = {{"color":"white"}}>Doctor registration number</strong>:<></>}
                {(userRole == 1) ? <input className="signin-container__signin-form__form-control" type = "text" placeholder={docReg} disabled onChange={getDoctRegNumber}></input> :<></> }
                {(userRole === 2)?<strong style = {{"color":"white"}}>Counselor registration number</strong>:<></>}
                {(userRole == 2) ? <input className = "signin-container__signin-form__form-control" type = "text" placeholder= {conReg} disabled onChange={getCounselorRegNumber}/> : <></>}
                <input className = "signin-container__signin-form__form-control" type = "text" name = "name" onChange={getFullName} placeholder="Enter your full name*" required/>
                <span className = "span-format" style = {{"color":"#9D1D02","display":"none"}} id = "name-error">Name must not be blank</span>

                <input className = "signin-container__signin-form__form-control" type = "email" name = "email" onChange={getEmail} placeholder="Enter your email*"/>
                <span className = "span-format"  style = {{"color":"#9D1D02","display":"none"}} id = "email-error">Email can not be blank</span>
                
                <span className = "span-format" style = {{"color":"#9D1D02","display":"none"}} id = "email-exist-error">Email is already exists in the record</span>

                <div class ="psw">
                    <input className = "signin-container__signin-form__form-control" id = "pass"  type = "password" name = "password" placeholder="Enter your password*" onChange={getPassword}/>
                    <img src = {eye} class = "eye-icon" onClick={toogleEyeIcon}/>
                </div>
                <span className = "span-format" style = {{"color":"#9D1D02","display":"none"}} id = "pass-error"></span>
                <div className ="psw">
                    <input className = "signin-container__signin-form__form-control" id = "pass2" type = "password" name = "repassword" onChange={getRePassword} placeholder="Retype your password*"/>
                    <img onClick={toogleEyeIcon2} className ="eye-icon" src = {eye} alt = "something went wrong"/>
                </div>
                <span className = "span-format" style = {{"color":"#9D1D02","display":"none"}} id = "repass-error">Password is not matched please retype again</span>
                <span className = "span-format" style = {{"color":"#9D1D02","display":"none"}} id = "repass2-error">You have to retype password to precced futhur</span>

                <div className = "signup-form__radio-grp">
                    <label for="gender"><input type = "radio" id = "male" value = "male" name = "gender" onChange={getGender}/> Male</label>
                    <label for="gender"><input type = "radio" id = "female" value = "female" name = "gender" onChange={getGender}/> Female</label>
                    <label for="gender"><input type = "radio" id = "other" value = "other" name = "gender" onChange={getGender}/> Other</label>
                </div>

                {(userRole == 0) ? <input className = "signin-container__signin-form__form-control" type = "text" name = "address1" placeholder="Enter your address" onChange={getAddress1} required/> : <></>}

                {/** Based on the user type a field will show that would allow the user to put their regration number (for doctor and counselors) */}
                {/* {(userRole == 1) ? <input className="signin-container__signin-form__form-control" type = "text" placeholder={docReg} disabled onChange={getDoctRegNumber}></input> :<></> }
                {(userRole == 2) ? <input className = "signin-container__signin-form__form-control" type = "text" placeholder= {conReg} disabled onChange={getCounselorRegNumber}/> : <></>} */}
                {/* {(userRole == 1 || userRole == 2) ? <input type = "submit" className = "signin-container__signin-form__form-control" value = "Signup" onClick={signup}/> : <></>} */}
                {/* {userRole != 1 && userRole != 2 ? <button className = "signup-form__next-btn" onClick={nextBtn}>Next</button> : <></>} */}
                <input type = "submit" className = "signin-container__signin-form__form-control" value = "Signup" onClick={signup}/>


            </form>

            <form id = "form2" style = {{"display":"none"}} className = "signup-form">
                {/* <input className = "signin-container__signin-form__form-control" type = "text" name = "address1" placeholder="Enter your address" onChange={getAddress1} required/> */}
                {/* <input className = "signin-container__signin-form__form-control" type = "text" name = "address2" placeholder="Enter your address2" onChange={getAddress2}/> */}
                {/* <input className = "signin-container__signin-form__form-control" type = "number" name = "phone" placeholder="Enter your phone number" onChange={getPhone}/> */}
                {/* <input className = "signin-container__signin-form__form-control" type = "date" name = "bdate" onChange={getDateOfBirth}/> */}

                {/* <input className = "signin-container__signin-form__form-control" type = "submit" value = "Signup" onClick={signup} /> */}
            </form>

            <div id = "successmsg" style = {{"display":"none","color":"white"}} className = "signup-form">
                <h3>Congratulation you have successfully singed up !!</h3>
            </div>

            <Link to = "/signin">Already have an account ? Signin</Link>
        </div>
    );
}

export default Signup;