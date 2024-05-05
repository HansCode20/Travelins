import React from 'react';
import { useDispatch } from 'react-redux';
import { isOpen, isPost } from '../../feature/action';
import { FaSearch } from 'react-icons/fa';

const Searchfeature = ({ setSearchQuery }) => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const addData = () => {
    dispatch(isPost(true));
    dispatch(isOpen());
  };

  return (
    <div className='flex items-center justify-between w-full max-w-md mx-auto'>
      <form className="flex-grow mr-4">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch color='white' />
          </div>
          <input onChange={handleSearch} type="search" id="default-search" className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        </div>
      </form>

      <button onClick={addData} className='bg-gray-900 font-bold h-fit rounded-md px-4 py-2 text-white'>Add</button>
    </div>
  );
};

export default Searchfeature;
