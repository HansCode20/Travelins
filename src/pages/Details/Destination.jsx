import React, { useEffect, useState } from "react";
import { fetchExternalData } from "../../utils/fetching";
import { useParams } from "react-router-dom";
import { MdBathroom } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { formatRupiah } from "../../utils/utils";
import aos from 'aos'
import 'aos/dist/aos.css'

const Destination = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    aos.init({
      duration: 2000
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchExternalData('activity', `/${id}`);
      setData(result.data);
    };
    fetchData();
  }, [id]);

  return (
    <div data-aos="fade-up" className="container mx-auto px-4 py-8 min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative overflow-hidden rounded-t-xl">
          <img src={data.imageUrls} alt="Destination" className="w-full h-auto rounded-t-xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60 transition-opacity opacity-0 hover:opacity-100"></div>
        </div>
        <div className="p-6 bg-white rounded-b-xl">
          <div className="flex items-center justify-between mb-3">
            <button className="text-xs uppercase tracking-wider px-3 py-1 rounded-lg bg-blue-500 text-white font-bold">{data.category?.name}</button>
          </div>
          <p className="text-base font-light text-gray-800">{data.description}</p>
          <div className="flex gap-3 mt-8">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
              <MdBathroom />
              {data.facilities}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h5 className="text-xl font-bold mt-3 leading-snug text-gray-800">{data.title}</h5>
          <div className="grid gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                <TiLocation />
                <p>{data.address} / {data.province}</p>
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-yellow-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"></path>
                </svg>
                {data.rating}/10
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="px-2 py-1 text-xs font-bold text-gray-800 bg-gray-200 border-b-2 border-green-500 rounded-md line-through">{formatRupiah(data.price)}</h6>
              <p className="font-semibold">to</p>
              <h6 className="px-2 py-1 text-xs font-bold text-orange-500 rounded-md">{formatRupiah(data.price_discount)}</h6>
            </div>
          </div>
          <h1 className="font-semibold text-xl mt-4">Map Location</h1>
          <div className="w-full h-full mt-2 overflow-hidden rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: data.location_maps }} className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Destination;
