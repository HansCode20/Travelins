import React, { useEffect, useState } from 'react';
import BackgroundVideo from "../assets/Vid/Background Video.mp4";
import IconTop from '../components/IconTop';
import Promo from '../components/Promo/Promo';
import Background from '../components/Activites/Background';
import Categories from '../components/Categories/Categories';
import Banner from '../components/Banner/Banner';

import Background2 from '../components/Activites/Background2';
function Home() {

  return (

    <div>
      <div className='h-screen overflow-hidden relative'>
        <div className="container-xl p-5 h-full relative">
          <video src={BackgroundVideo} className='rounded-xl w-full object-cover h-full' autoPlay loop muted ></video>
          <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16'>
            <h1 className='text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-center mb-4'>Explore the World <br /> With Us</h1>
            <h2 className='text-white text-xl lg:text-xl font-semibold text-center mb-4'>A Place where nature and adventure unite</h2>
            <button className='text-white bg-black p-3 rounded-xl hover:bg-white hover:text-black'>Learn More</button>
          </div>
        </div>
      </div>
        <IconTop></IconTop>
        <Promo></Promo>
        <Background></Background>
        <Categories></Categories>
        <Banner></Banner>
        <Background2></Background2>
    </div>
 
  )
}

export default Home;
