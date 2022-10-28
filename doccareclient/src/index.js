import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from "./components/Header";

import { BrowserRouter } from "react-router-dom"

import {loggedIn,loggedOut,store} from "./components/util/ApplicationContext";
import AuthenticatedHeader from './components/AuthenticatedHeader';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// store.dispatch(loggedOut());

// also we need to check if token is valid or not.

const dateExp = new Date(localStorage.getItem("exp")).getTime();
const dateNow = new Date().getTime();

if (dateNow > dateExp) {
  // alert("Token is expired");
  localStorage.removeItem("token");
  localStorage.removeItem("exp");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");

} else { 
  // alert("Token is still valid");
}


if (localStorage.getItem("isLoggedIn")) {
  store.dispatch(loggedIn());
} else {
  store.dispatch(loggedOut());
}

var isLoggedInState = store.getState();

console.log("the value of isLoggedInState : "+isLoggedInState.isLoggedIn);
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {isLoggedInState.isLoggedIn ? <AuthenticatedHeader/> : <Header/>}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
