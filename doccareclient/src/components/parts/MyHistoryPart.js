import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "./MyHistory.scss";

const MyHistory = (props)=> {
    const [history,setHisotry] = useState([]);

    useEffect(()=> {
        if (props.role === "doctor") {
            axios.get("http://localhost:4445/api/v1/dochistory?username="+props.email, {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                setHisotry(res.data);
                console.log(res.data);
            }).catch(e => console.error(e));

        } else if (props.role === "patient") {
            axios.get("http://localhost:4445/api/v1/patienthistory?username="+props.email, {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                setHisotry(res.data);
                console.log(res.data);
            }).catch(e => console.error(e));
        } else if (props.role === "counselor") {
            axios.get("http://localhost:4445/api/v1/conhistory?username="+props.email, {
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res=> {
                setHisotry(res.data);
                console.log(res.data);
            }).catch(e => console.error(e));
        }
    });
    return (
        <div className = "my-history-container">
            {(history != null) ? history.map(item => <div className ="my-history-container__history-item">{item.history}</div>): <></>}
        </div>
    );
}

export default MyHistory;