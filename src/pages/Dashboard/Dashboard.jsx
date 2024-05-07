import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../fragments/DashboardLayout';
import TabelContent from '../../components/Dashboard/TabelContent';
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
    <>
      <div className='p-4'>
        <h1 className='font-bold text-2xl mb-4'>Dashboard</h1>
        <div className='flex flex-wrap gap-6 justify-start items-center rounded-md w-fit '>
          <div className='rounded-xl p-4 flex gap-4 items-center shadow-md hover:shadow-xl'>
          <lord-icon
              src="https://cdn.lordicon.com/zfmcashd.json"
              trigger="hover"
              style={{ width: 40, height: 40 }}
            />
            <div className=' gap-1 font-semibold grid'>
              <h2>Users Data</h2>
              <h1 className='bg-gray-300 rounded-full text-center'>{user.length}</h1>
            </div>
          </div>
          <div className='rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-xl'>
          <lord-icon
             src="https://cdn.lordicon.com/tswnhcwg.json"
             trigger="hover"
             state="hover-rotate"
             style={{ width: 40, height: 40 }}/>
            <div className='gap-1 font-semibold grid'>
              <h2>Promo Data</h2>
              <h1 className='bg-gray-300 rounded-full text-center'>{promos.length}</h1>
            </div>
          </div>
          <div className='rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-xl'>
            <lord-icon
            src="https://cdn.lordicon.com/iikoxwld.json"
            trigger="hover"
            delay="1500"
            colors="primary:#e83a30"
            style={{ width: 40, height: 40 }}/>
            <div className=' gap-1 font-semibold grid'>
              <h2>Destination</h2>
              <h1 className='bg-gray-300 rounded-full text-center'>{destination.length}</h1>
            </div>
          </div>
          <div className='rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-xl'>
          <lord-icon
           src="https://cdn.lordicon.com/qwjfapmb.json"
           trigger="morph"
           state="morph-open"
           style={{ width: 40, height: 40 }}/>
            <div className=' gap-1 font-semibold grid'>
              <h2>Categories</h2>
              <h1 className='bg-gray-300 rounded-full text-center'>{categories.length}</h1>
            </div>
          </div>
          <div className='rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-xl'>
          <lord-icon
          src="https://cdn.lordicon.com/bzqvamqv.json"
          trigger="hover"
          state="morph-sea"
          style={{ width: 40, height: 40 }}/>
            <div className=' gap-1 font-semibold grid'>
              <h2>Banners Data</h2>
              <h1 className='bg-gray-300 rounded-full text-center'>{banners.length}</h1>
            </div>
          </div>
        </div>
        {/* Table Start */}
          <div className="relative mr-4 overflow-x-auto mt-10 rounded-xl" style={{  boxShadow: "5px 5px rgba(0, 0, 0, 0.2), 10px 10px rgba(0, 0, 0, 0.3), 15px 15px rgba(0, 0, 0, 0.2), 20px 20px rgba(0, 0, 0, 0.1), 25px 25px rgba(0, 0, 0, 0.05)"  }}>
            <table className="w-full text-sm text-left rtl:text-right">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-gray-200 ">
                User Data
              </caption>
              <thead className="text-xs  uppercase bg-gray-200 ">
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
                  <tr key={user.id} className="bg-gray-100 border-b-2">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                      {user.name}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                      {user.email}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                      {user.phoneNumber}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    {user.role }
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
