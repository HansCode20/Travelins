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
    <div className='flex items-center justify-between w-full max-w-md mx-auto p-4'>
      <form className="flex-grow mr-4">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch color='white' />
          </div>
          <input onChange={handleSearch} type="search" id="default-search" className="block w-full pl-10 p-2 rounded-lg border-2 shadow-lg focus:outline-none" placeholder="Search" required />
        </div>
      </form>

      <button onClick={addData} className='bg-black hover:bg-white hover:text-black font-bold h-fit rounded-md px-4 py-2 text-white'>Add</button>
    </div>
  );
};

export default Searchfeature;
