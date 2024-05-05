import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards,Autoplay } from 'swiper/modules';
const Headers = ({title,imageurl}) => {

  return (
    <>
<div id="default-carousel" className="hidden md:blockrelative w-full" >
    <div className="relative brightness-50 h-72 overflow-hidden rounded-lg md:h-96">
        <div className="w-full h-full" >
            <img src={imageurl[0] ||''} width={1000} height={2000} className="absolute object-cover h-full block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
    </div>
            <h1 className='max-sm:hidden text-8xl  absolute z-20 top-[40%] right-[50%] font-bold text-white'>{title}</h1>
    <div className='max-sm:hidden w-[200px] absolute top-0 right-[200px]'>
    <Swiper
    autoplay={{
        delay:1500,
        disableOnInteraction:false
    }}
        effect={'cards'}
        grabCursor={true}
        modules={[Autoplay,EffectCards]}
        className='flex w-80 z-20 h-96'
        >
        {imageurl.map((image)=>(
            <SwiperSlide className='brightness-75 hover:brightness-100  w-[80px] rounded-lg bg-gray-700 ' ><img className='h-full object-cover' src={image} /></SwiperSlide>
        ))}
      </Swiper>
          </div>
</div>
<h1 className='mt-4 md:hidden text-4xl oleo-script-bold '>{title}</h1>
    </>
  )
}

export default Headers