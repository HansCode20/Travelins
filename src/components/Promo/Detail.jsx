import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../UI/Loading.css'
const PromoDetail = () => {
  const {id} = useParams()
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const Info = [
    {
      id: 1,
      title: "Promo",
      content: promo?.title,
    },
    {
      id: 2,
      title: "Description",
      content: promo?.description,
    },
    {
      id: 3,
      title: "Promo Code",
      content: promo?.promo_code,
    }, 
    {
      id: 4,
      title: "Promo Discount Price",
      content: promo?.promo_discount_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
    }, 
    {
      id: 5,
      title: "Minimum Claim Price",
      content: promo?.minimum_claim_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
    }
  ]

  useEffect(() => {
    const getId = () => {
      setLoading(true);
      setTimeout(async () => {  
        try {
            const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`, {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k'
              },
            });
          setPromo(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching promo details:', error);
        } 
      }, 1000);
    };

    if (id) {
      getId();
    }
  }, [id]);

  

  // Render promo details
  return (
    <div className="container mx-auto p-6 md:p-10 min-h-screen">
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
      <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Promo Details
      </h1>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2">
          <img
            className="h-96 w-full object-cover"
            src={promo.imageUrl}
            alt="Promo"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10 space-y-6">
          {Info.map((info) => (
            <div
              key={info.id}
              className="flex flex-col md:flex-row items-start md:items-center gap-2 border-b pb-4"
            >
              <dt className="text-lg font-semibold text-gray-600">
                {info.title}:
              </dt>
              <dd className="text-gray-800 font-medium">{info.content}</dd>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-10">
        <button className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-white hover:text-black transition-all duration-300">
          Back to Promo
        </button>
      </div>
      </>
      )}
  </div>
  );
}

export default PromoDetail;
