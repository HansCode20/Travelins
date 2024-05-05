import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PromoDetail = () => {
  const {id} = useParams()
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getId = async () => {
      try {
        const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k'
          },
        });
        setPromo(response.data.data);
      } catch (error) {
        console.error('Error fetching promo details:', error);
      } finally {
        setLoading(false); // Set loading to false after request is complete, regardless of success or failure
      }
    };

    if (id) {
      getId();
    }
  }, [id]);

  // Check if loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if promo is available
  if (!promo) {
    return <div>No promo details available.</div>;
  }

  // Render promo details
  return (
    <div className="container mx-auto">
    <div className="px-4 sm:px-0 mt-6 flex justify-center">
      <h3 className="text-3xl font-bold leading-6 text-gray-900">Promo Details</h3>
    </div>
    <div className="mt-5">
      <img className="mx-auto rounded-lg" src={promo.imageUrl} alt="Promo" />
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg font-bold leading-5 text-gray-600">Title</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2">: {promo.title}</dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg font-bold leading-5 text-gray-600">Description</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2">: {promo.description}</dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg font-bold leading-5 text-gray-600">Promo Code</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2">: {promo.promo_code}</dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg font-bold leading-5 text-gray-600">Promo Discount</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2"> : {promo.promo_discount_price}</dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg font-bold leading-5 text-gray-600">Minimum Claim</dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900 sm:col-span-2">: Rp.{promo.minimum_claim_price.toLocaleString('id-ID')}</dd>
        </div>
      </dl>
    </div>
  </div>
  
  );
}

export default PromoDetail;
