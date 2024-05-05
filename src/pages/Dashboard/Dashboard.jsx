import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../fragments/DashboardLayout';
import TabelContent from '../../components/Dashboard/TabelContent';
import { fetchExternalData } from '../../utils/fetching';
import { FaUser } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaImages } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [promos, setPromos] = useState([]);
  const [destination, setDestination] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  const getUserData = async () => {
    const result = await fetchExternalData('all-user');
    setUser(result.data);
  };

  const getPromoData = async () => {
    const result = await fetchExternalData('promos');
    setPromos(result.data);
  };

  const getDestination = async () => {
    const result = await fetchExternalData('activities');
    setDestination(result.data);
  };

  const getCategory = async () => {
    const result = await fetchExternalData('categories');
    setCategories(result.data);
  };

  const getBanners = async () => {
    const result = await fetchExternalData('banners');
    setBanners(result.data);
  };

  useEffect(() => {
    getUserData();
    getPromoData();
    getDestination();
    getCategory();
    getBanners();
  }, []);

  return (
    <>
      <div className='p-4'>
        <h1 className='font-bold text-2xl mb-4'>Dashboard</h1>
        <div className='flex flex-wrap gap-4 justify-start items-center rounded-md w-fit'>
          <div className='rounded-md bg-gray-800 p-1 flex gap-3 items-center'>
            <div className='text-white gap-2 font-semibold grid'>
              <h2>Users Data</h2>
              <h1>{user.length}</h1>
            </div>
            <FaUser size={34} color='white' />
          </div>
          <div className='rounded-md bg-gray-800 p-1 flex gap-3 items-center'>
            <div className='text-white gap-2 font-semibold grid'>
              <h2>Promo Data</h2>
              <h1>{promos.length}</h1>
            </div>
            <MdDiscount size={34} color='white' />
          </div>
          <div className='rounded-md bg-gray-800 p-1 flex gap-3 items-center'>
            <div className='text-white gap-2 font-semibold grid'>
              <h2>Destination</h2>
              <h1>{destination.length}</h1>
            </div>
            <FaLocationDot size={34} color='white' />
          </div>
          <div className='rounded-md bg-gray-800 p-1 flex gap-3 items-center'>
            <div className='text-white gap-2 font-semibold grid'>
              <h2>Categories</h2>
              <h1>{categories.length}</h1>
            </div>
            <BiSolidCategory size={34} color='white' />
          </div>
          <div className='rounded-md bg-gray-800 p-1 flex gap-3 items-center'>
            <div className='text-white gap-2 font-semibold grid'>
              <h2>Banners Data</h2>
              <h1>{banners.length}</h1>
            </div>
            <FaImages size={34} color='white' />
          </div>
        </div>
        {/* Table Start */}
        <div className="relative mr-4 overflow-x-auto mt-10 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              User Data
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {user.slice(0, 5).map(user => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.email}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.phoneNumber}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.role}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table End */}
      </div>
    </>
  );
}

export default Dashboard;
