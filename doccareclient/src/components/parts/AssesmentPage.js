import React, { useState } from "react";

import "./AssesmentPage.scss";

import readyToSubmitImage from "../../assets/images/readytosubmit.png";
import axios from "axios";

const AssesMentPage = (props)=> {
    const [counter,setCounter] = useState(1);
    const [previousOption,setPreviousOption] = useState(null);
    const [ansArray, setAnsArray] = useState([]);

    const assesmentQuestionAndAnswer = {
        question : [
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you're a failure or have let yourself or your family down?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
            "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?"
        ],
        options : [
            "Not at all",
            "Several days",
            "More Than Half The Days",
            "Nearly Every Day"
        ],
        
        
    };

    const[domQuestion,setDomQuestion] = useState(assesmentQuestionAndAnswer.question[0]);
    const [assesment,setAssesment] = useState({});
    const [assesmentHistory,setAssesmentHistory] = useState({});
    const [assesmentHistoryArr,setAssesmentHistoryArr] = useState([]);

    

    const nextButton = ()=> {
        assesmentHistoryArr.push(assesment); // pushing to the history arr
        console.log(assesmentHistoryArr);


        if(previousOption != null) {
            previousOption.target.style.backgroundColor = "#558D96";
            previousOption.target.style.color = "white";
        }

        ansArray.push(assesment);
        setDomQuestion(assesmentQuestionAndAnswer.question[counter]);
        setCounter(counter + 1);
    }

    const submitAssesment = async ()=> {
        // this will made an axios/fetch request to the backend and perform the submition of the assesment question answer
        var data = [];
        ansArray.forEach(item => {data.push({"question":item.question,"option":item.option})});
        console.log(data);

        
        await axios.put("http://localhost:4445/api/v1/assesment",data,{
            headers: {
                'authorization' : "Bearer "+ localStorage.getItem("token")
            }
        }).then(res => {
            axios.get("http://localhost:4445/api/v1/patientpendinghistory?patId="+localStorage.getItem("id"),{
                headers : {
                    'authorization': "Bearer "+localStorage.getItem("token")
                }
            })
            .then(res=> {

            })
        });
        // alert("Submitting assessment");  
        window.location = "/";
    }

    const getOption = (event)=> {
        if(previousOption != null) {
            previousOption.target.style.backgroundColor = "#558D96";
            previousOption.target.style.color = "white";
        }
        // alert (event.target.innerHTML);
        event.target.style.backgroundColor = "white";
        event.target.style.color = "blue";

        let saveAbleJson = {
            question : domQuestion,
            option : event.target.innerHTML
        };

        setAssesment(saveAbleJson);
        setPreviousOption(event);
    }

    const backBtn = (event)=> {
        // console.log("Back btn pressed "+assesmentHistoryArr[counter - 2].question);
        if (counter > 1) {
            assesmentHistoryArr.splice(counter-2,1);
            setDomQuestion(assesmentQuestionAndAnswer.question[counter - 2]);
            ansArray.splice(counter - 2,1);
            setCounter(counter - 1);
        }

    }
    return (
        <div className = "assesment-page-container">
            <div className = "assesment-page-container__box">
                <div className = "assesment-page-container__box__header">Self Assesment</div>

                {(counter < 10) ? <div className = "assesment-page-container__box__counter">{counter}/9</div> : <></>}

                <div className = "assesment-page-container__box__question" id ="question">
                    {domQuestion}
                </div>
                {(counter < 10) ? <div className = "assesment-page-container__box__option" id = "question">
                    {(assesmentQuestionAndAnswer.options.map((item)=> <div onClick={getOption}>{item}</div>))}
                </div> : <div className = "assesment-page-container__box__submit-page">
                    <div>Assesment is ready to submit !!</div>
                    <img src = {readyToSubmitImage} alt ="something went wrong" />
                    </div>}
                {(counter < 10) ? 
                <div style = {{"display" : "flex","justify-content":"space-between","margin-top":"2rem","flex-direction":"row-reverse"}}>
                {(counter < 10) ? <button className = "assesment-page-container__box__next" onClick={nextButton}>Next</button> : <button className = "assesment-page-container__box__submit" onClick={submitAssesment}>Submit Assesment</button> }
                {(counter > 1 ) ? <button className = "assesment-page-container__box__back" onClick={backBtn}>Back</button> : <></> }
                </div> :  <button className = "assesment-page-container__box__submit" onClick={submitAssesment}>Submit Assesment</button>}

            </div>

        </div>
    );
}

export default AssesMentPage;