import React from 'react';

import "./Footer.scss";

import fb from "../assets/svg/fb.svg";
import insta from "../assets/svg/insta.svg";
import twitter from "../assets/svg/twitter.svg";
import linkedin from "../assets/svg/linkedin.svg";


const Footer = ()=> {
    return (
        <div className = "footer-container">
            <div className = "footer-container__info-grp">
                <span>Address : a dummy address</span>
                <span>Email : mediscopeofficial@gmail.com</span>
                <span>Phone : xxxxx-xxxxx</span>
                <span>Fax : xx-xx-xx</span>

                <h4>Copyright &copy; mediscope.com from 2022</h4>
            </div>
                <div className = "footer-container__social-media-link-grp">
                        <img src = {fb} alt = "something went wrong"></img>
                        <img src = {insta} alt = "something went wrong"/>
                        <img src = {twitter} alt = "something went wrong"/>
                        <img src = {linkedin} alt = "something went wrong"/>
                </div>


        </div>
    );
}

export default Footer;