import React from 'react';
import IconTop from '../components/IconTop';
import Promo from '../components/Promo';
import Background from '../components/About/Background';
import Categories from '../components/Categories/Categories';
import Banner from '../components/Banner/Banner';
import Background2 from '../components/About/Background2';

const Section = ({children}) => {
  return (
    <div>
      <IconTop />
      <Promo/>
      {children}
      <Background/>
      <Categories/>
      <Banner/>
      <Background2/>
    </div>
  )
}

export default Section