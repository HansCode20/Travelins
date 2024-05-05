import React, { useEffect, useState } from 'react';
import axios from 'axios';
import aos from 'aos';
import 'aos/dist/aos.css';

const Background = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [activity, setActivity] = useState(null);

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
          setBackgroundImageUrl(res.data?.data[4]?.imageUrls[0]); // Set the background image URL
          setActivity(res.data.data[4]);
        }
      })
      .catch((err) => {
        console.error('Error fetching background images:', err);
      });
  }, []);

  return (
    <div className='h-screen overflow-hidden relative'>
      <div  data-aos="zoom-in" className="text-black container-xl p-10 h-full relative">
        {/* Use image URL from the state */}
        {backgroundImageUrl && (
          <img src={backgroundImageUrl} className='rounded-xl w-full object-cover h-full max-h-[600px]' alt="Background" />
        )}
        <div className='absolute top-0 left-0 p-6 sm:p-8 lg:p-12  xl:p-16 flex flex-col sm:flex-row justify-between w-full'>
          <div className="flex text-black flex-col justify-center">
            <h1 className="text-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold p-4 ">
              Enjoy Your <br />
              Travel
            </h1>
            <h2 className='text-black pt-7 text-xl p-4'>
              Discover the most unique and vibrant
              <br />
              experiences the Azores have to offer
            </h2>
          </div>
          {activity && (
            <div className='sm:mt-auto sm:ml-auto p-10 '>
              <div className=' bg-opacity-70 rounded-xl p-4'>
                <h1 className="text-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-center">
                  {activity?.title}, <br />
                  {activity?.province}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Background;
