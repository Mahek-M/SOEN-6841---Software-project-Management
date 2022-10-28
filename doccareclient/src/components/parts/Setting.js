import React, { useEffect, useState } from "react";

import "./Setting.scss";

import penIcon from "../../assets/svg/pen.svg";
import axios from "axios";

const Setting = ()=> {
    const [isEditableName,setIsEditableName] = useState(false);
    const [editableComponentName,setEditableComponentName] = useState(null);
    const [isEditableAddress,setIsEditableAddress] = useState(false);
    const [editableComponentAddress,setEditableComponentAddress] = useState(null);
    const [image,setImage] = useState(null);

    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");

    const editFieldName = (event)=> {
        setEditableComponentName(document.getElementById("name"));
        // editableComponent1 = event.target;
        setIsEditableName(!isEditableName);
    }

    const editFieldAddress = (event)=> {
        setEditableComponentAddress(document.getElementById("address"));
        // editableComponent1 = event.target;
        setIsEditableAddress(!isEditableAddress);
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    document.addEventListener('keydown', async (e) => {
        if (e.ctrlKey && String.fromCharCode(e.keyCode).toLowerCase() === 's') {
          e.preventDefault();
          e.stopPropagation();

          // disable all editable field
          document.getElementById("name").contentEditable = false;
          document.getElementById("name").style.borderBottom = "none";
          
          if(localStorage.getItem("role") === "patient") {
            document.getElementById("address").contentEditable = false;
            document.getElementById("address").style.borderBottom = "none";
          }


          axios.post("http://localhost:4445/api/v1/updateUserInfo",
          {
            "username":localStorage.getItem("email"),
            "name":document.getElementById("name").textContent,
            "address": (localStorage.getItem("role") === "patient")? document.getElementById("address").textContent : ""
            },
            {
                headers:{
                    'authorization' : "Bearer "+localStorage.getItem("token")
                }
            }
          ).then(res => {
            console.log(res.data);
            localStorage.setItem("name",document.getElementById("name").textContent);
            localStorage.setItem("address",document.getElementById("address").textContent);
          });
          
          if(image != null) {
            var data = new FormData();
                data.set("username", localStorage.getItem("email"))
		        data.set("profileImage",image);
                axios.post("http://localhost:4445/api/v1/profileImg", 
                    data, {headers:{
                        'Content-Type': 'multipart/form-data' // do not forget this 
                    }}
                ).then(res => {
                    axios.get("http://localhost:4445/api/v1/getProfileImg?username="+localStorage.getItem("email"), {
                        headers:{
                            'authorization' : "Bearer "+localStorage.getItem("token")
                        }
                    }).then(res => {
                        localStorage.setItem("profileImage",res.data);
                    });
                });
          }
        


          document.getElementById("notification").style.display = "flex";
          document.getElementById("notification").style.animation = "notification .40s";
  
        await timeout(3000);

        document.getElementById("notification").style.animation = "notificationFadeUp 1s";
        await timeout(1000);
        document.getElementById("notification").style.display = "none";
        


        }
      }, false);

    useEffect(()=> {
        // setEmail(localStorage.getItem("email"));
        // if (localStorage.getItem("patient")) {
        //     setAddress(document.getElementById("address").textContent);

        // }

        // setName(document.getElementById("name").textContent);
        // alert(name);

        

        if (isEditableName) {
            if (editableComponentName != null) {
                editableComponentName.contentEditable = true;
                editableComponentName.style.borderBottom = "3px solid darkBlue";
            }
        } else {
            if (editableComponentName != null) {
                editableComponentName.contentEditable = false;
                editableComponentName.style.borderBottom = "none";

            }
        }


        if (isEditableAddress) {
            if (editableComponentAddress != null) {
                editableComponentAddress.contentEditable = true;
                editableComponentAddress.style.borderBottom = "3px solid darkBlue";
            }
        } else {
            if (editableComponentAddress != null) {
                editableComponentAddress.contentEditable = false;
                editableComponentAddress.style.borderBottom = "none";
            }
        }
    });

 
    const getImage = (event)=> {
        setImage(event.target.files[0]);
    }

    return (
        <div className = "setting-container">
            <div id = "notification" className = "setting-container__save-notification">
                <h4>User info saved ..</h4>
            </div>
            <div className ="setting-container__image-btn-grp">
            {(image != null) ? <img src = {URL.createObjectURL(image)} alt = "Something went wrong"/> : <img src = {"data:image/jpeg;charset=utf-8;base64,"+localStorage.getItem("profileImage")} alt = "Something went wrong"/>}
            <form>
                <span className = "setting-container__image-up">
                    <label for = "image"><a>Upload image</a></label>
                    <input id = "image" onChange={getImage} type = "file"/>
                </span>
            </form>
            </div>
            <div className = "setting-container__user-address">
                <h4>Email : {localStorage.getItem("email")}</h4>
                <span className = "setting-container__user-address__pen-content-grp"><h4>Name : </h4> <span id = "name">{localStorage.getItem("name")}</span> <img onClick={editFieldName} src = {penIcon} alt ="something went wrong"/></span>
                {(localStorage.getItem("role") === "patient")? <span className = "setting-container__user-address__pen-content-grp"><h4>Address : </h4> <span id = "address" >{localStorage.getItem("address")}</span> <img onClick={editFieldAddress} src = {penIcon} alt ="something went wrong"/></span> : <></>}
                {(localStorage.getItem("role") === "doctor")? <><h4 style = {{display:"inline-block"}}>Doctor Registration number :</h4>{" "+localStorage.getItem("docRegNo")}</>: <></>}
                {(localStorage.getItem("role") === "counselor")? <><h4 style = {{display:"inline-block"}}>Counselor Registration number :</h4>{" "+localStorage.getItem("counselorRegNo")}</>: <></>}

                
            </div>
        </div>
    );
}

export default Setting;