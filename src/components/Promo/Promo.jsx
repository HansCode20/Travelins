import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import aos from 'aos';
import 'aos/dist/aos.css';



const Promo = () => {
    const [promo, setPromo] = useState([]);
    const [showAll, setShowAll] = useState(false); // State untuk menampilkan semua promo

    useEffect(() => {
        getPromo();
    }, []);

    useEffect(() => {
        aos.init({ duration: 2000 });
      })

    const getPromo = () => {
        axios
            .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
            })
            .then((res) => {
                console.log(res);
                setPromo(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSeeAll = () => {
        setShowAll(true);
    }

    const handsCloseAll = () => {
        setShowAll(false);
    }

    return (
        <div className="bg-white mt-[80px]">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Choose Your Tour</h2>
                <h3 className='text-2xl font-bold line-through  text-gray-900'>Promo</h3>

                <div data-aos="fade-up" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {showAll ? (
                        promo.map((item) => (
                            <div key={item.id} className="group relative shadow-lg rounded-xl  ">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        src={item.imageUrl}
                                        alt="Promo"
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:scale-110  hover:duration-500 transition-transform"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-between p-2">
                                    <div className=''>
                                        <p className='text-sm ml-4 font-medium text-gray-900'>
                                            {item.title}
                                        </p>
                                    <p className='text-sm ml-4 font-bold text-gray-900 '>
                                        Rp.{item.promo_discount_price.toLocaleString('id-ID')}
                                        <span className='font-medium text-[13px]'>/Person</span>
                                    </p>
                                    </div>
                                    <Link to={`/detail/${item.id}`}>
                                    <div className='bg-black p-4 rounded-full text-white'>
                                         <FaArrowRight />
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        promo.slice(0, 4).map((item) => ( // Hanya menampilkan 4 promo pertama
                            <div key={item.id} className="group relative shadow-lg rounded-xl ">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        src={item.imageUrl}
                                        alt="Promo"
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:scale-110  hover:duration-500 transition-transform"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-between p-2 gap-2">
                                    <div className='gap-4'>
                                        <p className='text-sm ml-4 font-medium text-gray-900'>
                                            {item.title}
                                        </p>
                                    <p className='text-sm ml-4 font-bold text-gray-900 '>
                                        Rp.{item.promo_discount_price.toLocaleString('id-ID')}
                                        <span className='font-medium text-[13px]'>/Person</span>
                                    </p>
                                    </div>
                                    <Link to={`/detail/${item.id}`}>
                                    <div className='bg-black p-4 rounded-full text-white'>
                                         <FaArrowRight />
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {!showAll && (
                    <button
                        className="text-black bg-white px-12 py-3 mt-[40px] border-2 border-black rounded-full mt-4 hover:bg-black hover:text-white font-bold mx-auto block"
                        onClick={handleSeeAll}
                    >
                        See All
                    </button>
                )}

                {showAll && (
                    <button
                    className="text-black bg-white px-12 py-3 mt-[40px] border-2 border-black rounded-full mt-4 hover:bg-black hover:text-white font-bold mx-auto block"
                        onClick={handsCloseAll}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}

export default Promo;
