import React, { useEffect, useState } from 'react';

import DoctorProfileCard from './parts/DoctorProfileCard';
import Pricing from "./parts/Pricing";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from 'better-react-carousel';

import caro1 from "../assets/images/caro1.jpg";
import caro2 from "../assets/images/caro2.jpg";
import caro3 from "../assets/images/caro3.jpg";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "./LandingBody.scss";
import happyDoc from "../assets/images/happy doctor.jpg";
import Signin from './parts/Signin';

import { Link } from 'react-router-dom';
import axios from 'axios';

// import * as Scroll from 'react-scroll';
// import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



const LandingBody = (props)=> {
    const [docList,setDocList] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:4445/api/v1/doctors").then(res => {
                    setDocList(res.data);
                });
    });
    
    return (
        <div className = "landing-body-container">
            {/* <Signin/> */}


            <div className = "landing-body-container__geting-started-container">
                <div class = "landing-body-container__geting-started-container__text-button-grp">
                    <h1>GET STARTED<br></br>AND FIND YOUR FIND YOUR DOCTOR</h1>
                    <Link to = "/signup" >GET STARTED</Link>
                </div>
                <img className = "landing-body-container__geting-started-container__image" src = {happyDoc} alt = "something went wrong"></img>
            </div>

            {/* carousel section */}
            <div className = "landing-body-container__caro">
                <Carousel style = {{"margin-top":"3rem"}} cols={1} rows={1} gap={10} loop={true}  showDots={true} hideArrow = {true} autoplay = {3000}>
                    <Carousel.Item>
                        <img width="100%" height = "505rem" src={caro1} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" height = "505rem" src={caro2} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width="100%" height = "505rem" src={caro3} />
                    </Carousel.Item>
                </Carousel>
            </div>
{/* 
            <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper> */}

            <div className = "landing-body-container__doctor-profile-container">
                <h1 style = {{"margin-bottom": "2rem"}}>OUR SPECIALIZED DOCTORS</h1>

                <div className = "landing-body-container__doctor-profile-container__card-grp">
                    {/* <DoctorProfileCard/>
                    <DoctorProfileCard/>
                    <DoctorProfileCard/> */}

                {
                    (docList !=null) ? docList.slice(0,4).map(item=> (<DoctorProfileCard image = {"data:image/jpeg;charset=utf-8;base64,"+item.profileImage.image} name ={item.name}/>)): <></>
                }
                </div>
            </div>

            <div className = "landing-body-container__pricing-container">
                <h1>Pricing</h1>
                
                <div class = "landing-body-container__pricing-container__pricing">
                    <Pricing/>
                    <Pricing/>
                </div>
            </div>
        </div>
    );
}

export default LandingBody;