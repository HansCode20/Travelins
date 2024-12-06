import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../fragments/DashboardLayout';
import { fetchExternalData } from '../../utils/fetching';

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
    <div className="p-4 md:p-10">
      <h1 className="font-bold text-2xl mb-4 text-center sm:text-left">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          { title: 'Users Data', count: user.length, icon: 'https://cdn.lordicon.com/zfmcashd.json', teks: 'Users Data in the system' },
          { title: 'Promo Data', count: promos.length, icon: 'https://cdn.lordicon.com/tswnhcwg.json', teks: 'Promo Data in the system' },
          { title: 'Destination', count: destination.length, icon: 'https://cdn.lordicon.com/iikoxwld.json', teks: 'Destination Data in the system' },
          { title: 'Categories', count: categories.length, icon: 'https://cdn.lordicon.com/qwjfapmb.json', teks: 'Categories Data in the system' },
          { title: 'Banners Data', count: banners.length, icon: 'https://cdn.lordicon.com/bzqvamqv.json', teks: 'Banners Data in the system' },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-xl p-4 flex gap-4 items-center shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <lord-icon
              src={item.icon}
              trigger="hover"
              style={{ width: 40, height: 40 }}
            />
            <div className="gap-1 font-semibold grid">
              <h2 className="text-gray-700">{item.title}</h2>
              <h3 className="text-xs text-gray-500">
                {item.teks}
              </h3>
            </div>  
            <div className='font-semibold text-gray-700 ml-auto p-2 rounded'>
                {item.count}
            </div>
          </div>
        ))}
      </div>

      {/* Table Start */}
      <div className="mt-10 rounded-xl shadow-xl">
        <div className="bg-white p-5 text-lg  text-center font-semibold text-gray-800">
          User Data
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-200 text-black">
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
              {user.slice(0, 5).map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } border-b`}
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Table End */}
    </div>
  );
};

export default Dashboard;
