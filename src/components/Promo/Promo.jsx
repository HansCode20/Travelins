import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import aos from 'aos';
import 'aos/dist/aos.css';
import '../UI/Loading.css';

const Promo = () => {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        getPromo();
    }, []);

    useEffect(() => {
        aos.init({ duration: 2000 });
    }, []);

    const getPromo = () => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    },
                })
                .then((res) => {
                    setPromo(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }, 1000);
    };

    const handleSeeAll = () => {
        setLoading(true);
        setTimeout(() => {
            setShowAll(true);
            setLoading(false);
        }, 1000);
    };

    const handsCloseAll = () => {
        setLoading(true);
        setTimeout(() => {
            setShowAll(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white mt-[40px]">
            {loading ? (
                <div className="loader flex justify-center items-center mx-auto">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                </div>
            ) : (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">Choose Your Tour</h2>
                    <h3 className="text-2xl font-bold line-through text-gray-900">Promo</h3>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {(showAll ? promo : promo.slice(0, 4)).map((item) => (
                            <div key={item.id} className="group relative shadow-lg rounded-xl">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        src={item.imageUrl}
                                        alt="Promo"
                                        className="h-64 w-full object-cover object-center lg:h-full lg:w-full hover:scale-110 hover:duration-500 transition-transform"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-between p-2">
                                    <div>
                                        <p className="text-sm ml-4 font-medium text-gray-900">
                                            {item.title}
                                        </p>
                                        <p className="text-sm ml-4 font-bold text-gray-900">
                                            Rp.{item.promo_discount_price.toLocaleString('id-ID')}
                                            <span className="font-medium text-[13px]">/Person</span>
                                        </p>
                                    </div>
                                    <Link to={`/detail/${item.id}`}>
                                        <div className="bg-black p-4 rounded-full text-white">
                                            <FaArrowRight />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showAll ? (
                        <button
                            className="text-black bg-white px-12 py-3 mt-[40px] border-2 border-black rounded-full mt-4 hover:bg-black hover:text-white font-bold mx-auto block"
                            onClick={handleSeeAll}
                        >
                            See All
                        </button>
                    ) : (
                        <button
                            className="text-black bg-white px-12 py-3 mt-[40px] border-2 border-black rounded-full mt-4 hover:bg-black hover:text-white font-bold mx-auto block"
                            onClick={handsCloseAll}
                        >
                            Close
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Promo;
