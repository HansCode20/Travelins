import React, { useEffect, useState } from 'react';
import axios from 'axios';
import aos from 'aos';
import 'aos/dist/aos.css';

const Background2 = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    aos.init({
      duration: 2000,});
  }, []);

  useEffect(() => {
    axios
      .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setBackgroundImageUrl(res.data?.data[0]?.imageUrls[0]); // Set the background image URL
        }
      })
      .catch((err) => {
        console.error('Error fetching background images:', err);
      });
  }, []);

  return (
    <div data-aos="zoom-in" className='h-screen overflow-hidden relative '>
      <div className="container mx-auto h-full relative p-6">
        {/* Use image URL from the state */}
        {backgroundImageUrl && (
          <img width={1000} height={200} src={backgroundImageUrl} className='brightness-50 rounded-xl w-full object-cover h-full max-h-[600px]' alt="Background" />
        )}
        <div className='absolute top-0 left-0 p-6 sm:p-8 lg:p-12  xl:p-16 flex flex-col sm:flex-row justify-center items-center w-full h-full'>
          <div className="text-center">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold p-4 ">
              Let's start <br /> the Travel Journey
            </h1>
            <h2 className='text-white pt-7 text-xl p-6 sm:p-10 lg:p-14 font-semibold '>
              "Let's start this adventure with the first step, exploring amazing destinations, smelling new air, and creating unforgettable memories along our journey."
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Background2;
