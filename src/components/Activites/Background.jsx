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
          setBackgroundImageUrl(res.data?.data[1]?.imageUrls[0]); // Set the background image URL
          setActivity(res.data?.data[1]);
        }
      })
      .catch((err) => {
        console.error('Error fetching background images:', err);
      });
  }, []);

  return (
    <div>
      <div  data-aos="zoom-in" className="relative">
        {/* Use image URL from the state */}
        <div className='bg-black opacity-50 absolute top-0 left-0 w-full h-full'></div>
        {backgroundImageUrl && (
          <img src={backgroundImageUrl} className='lg:rounded-xl w-full object-cover h-50 max-h-[600px]' alt="Background" />
        )}
        <div className='absolute top-0 left-0 p-6 sm:p-8 lg:p-12  xl:p-16 w-full'>
            <div className='flex flex-row justify-between items-center'>
              <h1 className="text-white text-xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold p-4 ">
                Enjoy Your <br />
                Travel
              </h1>
                  <span className="text-white text-sm sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-center">
                    {activity?.title}, <br />
                    {activity?.province}
                  </span>
            </div>
              <h2 className='text-white pt-7 text-sm md:text-xl p-4'>
                Discover the most unique and vibrant
                <br />
                experiences the Azores have to offer
            </h2>
        </div>
      </div>
    </div>
  );
}

export default Background;
