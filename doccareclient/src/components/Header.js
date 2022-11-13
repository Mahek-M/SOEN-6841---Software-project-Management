import React from 'react';
import "./Header.scss";
import "./root.scss";

import LandingBody from './LandingBody';
import Footer from './Footer';

import { Route, Routes, Link } from "react-router-dom"
import Signin from './parts/Signin';
import Signup from './parts/Signup';
import ErorrPage from './parts/ErrorPage';

import logo from "../assets/images/logo.png";

import AssesmentPage from "./parts/AssesmentPage";
import ForgetPasswordPart from "./parts/ForgetPasswordPart";
import ResetPassPart from "./parts/ResetPassPart";


const Header = ()=> {
    return (
        <div>
            <div name = "header" className = "nav">
                <div><Link to = "/"><img src = {logo} alt = "something went wrong"/></Link></div>
                <div className = "nav__navigation-item-grp">
                    <div>About us</div>
                    <div className='nav__navigation-item-grp__signup-login-grp'>
                        <div><Link to = "signup">Signup</Link></div>/
                        <div><Link to = "/signin">Signin</Link></div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path = '/' element = {<LandingBody/>}/>
                <Route path = '/signin' element = {<Signin/>}/>
                <Route path = '/signup' element = {<Signup/>}/>
                <Route path = '/forgetpass' element = {<ForgetPasswordPart/>}/>
                <Route path = '/resetpass' element = {<ResetPassPart/>}/>
                

                <Route path="*" element={<ErorrPage />} />

            </Routes>
            <Footer/>
            {/* <AssesMentPage/> */}
            {/* <AdminPanel/> */}
            
            {/* <Signup/> */}
        </div>
        // <AssesmentPage/>
    );
}

export default Header;