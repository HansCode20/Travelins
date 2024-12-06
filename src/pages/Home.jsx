import React from 'react';
import BackgroundVideo from "../assets/Vid/Background Video.mp4";
import IconTop from '../components/IconTop';
import Promo from '../components/Promo/Promo';
import Background from '../components/Activites/Background';
import Categories from '../components/Categories/Categories';
import Banner from '../components/Banner/Banner';

import Background2 from '../components/Activites/Background2';
function Home() {

  return (

    <div className='space-y-20'>
        <div className="container-xl h-full relative">
          <video src={BackgroundVideo} className='w-full object-cover h-64 md:h-96 object-cover' autoPlay loop muted ></video>
          <div className='absolute top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center'>
            <h1 className='text-white text-lg lg:text-6xl xl:text-7xl font-semibold text-center mb-4'>Explore the World <br /> With Us</h1>
            <h2 className='text-white text-xs lg:text-xl font-semibold text-center mb-4'>A Place where nature and adventure unite</h2>
            <button className='text-white text-sm bg-black p-3 rounded-xl hover:bg-white hover:text-black'>Learn More</button>
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
