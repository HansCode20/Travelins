import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import './Banner.css';
import aos from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    aos.init({
      duration: 2000,
      easing: 'ease',
    });
  })


  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        setBanners(response.data.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    getBanners();
  }, []);

  return (
    <div data-aos="zoom-in" className='p-2'>
      <Marquee pauseOnHover>
        {banners.map((banner) => (
          <div key={banner.id} className='relative mx-4 '>
            <img src={banner.imageUrl} alt="banner" className='object-cover rounded-lg w-64 h-40' />
            <div className='overlay absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 hover:rounded-lg text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <h1 className='text-white text-xl font-bold'>
                {banner.name}
              </h1>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Banner;

