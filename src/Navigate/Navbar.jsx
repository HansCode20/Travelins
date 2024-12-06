import React, { useEffect, useState } from 'react';
import Logo from '../assets/Images/Logos.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaMapMarked } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { Toaster, toast } from 'sonner';
import MenuProfile from '../components/UtilsFeature/MenuProfile';
import { isOpen } from '../feature/action';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [user, setUser] = useState(null);

  const tokenLocal = JSON.parse(localStorage.getItem('token'));

  const fetchUserData = () => {
    if (tokenLocal) {
      axios
        .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
          headers: {
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            Authorization: `Bearer ${tokenLocal}`,
          },
        })
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout', {
        headers: {
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          Authorization: `Bearer ${tokenLocal}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.removeItem('token');
        window.location.reload();
      })
      .catch(() => toast.error('Logout failed'));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNav = () => setNavIsOpen(!navIsOpen);

  const goTo = (url) => {
    navigate(url);
    setMenuOpen(false);
    setNavIsOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="p-2 z-40 shadow-b-2 border-b shadow-lg">
      <div className="flex justify-between">
        {/* Logo Section */}
        <div className="mx-5">
          <button onClick={() => navigate('/')}>
            <img src={Logo} alt="Logo" className="w-20 rounded-full" />
          </button>
        </div>

        <Toaster />

        {/* Desktop Navigation */}
        <div className="flex items-center mx-5 gap-5 font-bold">
          <div className="hidden sm:flex gap-4">
            <button onClick={() => navigate('/destination')}>Destination</button>
            <button onClick={() => navigate('/category')}>Category</button>
            {user?.role === 'admin' && (
              <button onClick={() => navigate('/dashboardadmin')}>Dashboard</button>
            )}
          </div>

          {/* User Actions */}
          {tokenLocal ? (
            <>
              <div className="hidden sm:flex items-center gap-4">
                <MenuProfile />
                <div className="grid place-items-center">
                  <h1>{user?.name}</h1>
                  <p className="text-[10px] px-1 rounded-md text-center bg-slate-800 text-white text-sm">
                    {user?.role}
                  </p>
                </div>
                <button onClick={() => dispatch(isOpen())}>
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src={user?.profilePictureUrl}
                    alt="Profile"
                  />
                </button>
              </div>
              <button onClick={toggleNav} className="sm:hidden block">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#242424" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
                </svg>
              </button>
            </>
          ) : (
            <a href="/login" className="text-white bg-black p-3 rounded-xl hover:bg-white hover:text-black">
              Login
            </a>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className={`${navIsOpen ? 'block' : 'hidden'} fixed top-0 right-0 w-screen h-screen bg-white z-50`}>
          <button onClick={toggleNav} className="flex justify-end w-full p-4">
            <IoCloseOutline size={42} />
          </button>
          <div className="gap-6 grid place-items-center mt-10">
            <button onClick={() => goTo('/')} className="flex gap-3 items-center text-3xl">
              <FaHome />
              Home
            </button>
            <button onClick={() => goTo('/destination')} className="flex gap-3 items-center text-3xl">
              <FaLocationDot />
              Destination
            </button>
            <button onClick={() => goTo('/category')} className="flex gap-3 items-center text-3xl">
              <FaMapMarked />
              Category
            </button>
            {user?.role === 'admin' && (
              <button onClick={() => goTo('/dashboardadmin')} className="flex gap-3 items-center text-3xl">
                <AiFillDashboard />
                Dashboard
              </button>
            )}
          </div>
          {tokenLocal && (
            <div className="mt-4 p-4 shadow-md rounded-lg">
              <div className="flex items-center gap-4 border-b-2 pb-2">
                <div className="grid place-items-center">
                  <h1>{user?.name}</h1>
                  <p className="text-[10px] px-1 rounded-md bg-slate-800 text-white text-sm">{user?.role}</p>
                </div>
                <button onClick={() => dispatch(isOpen())}>
                  <img className="rounded-full w-12 h-12 object-cover" src={user?.profilePictureUrl} alt="Profile" />
                </button>
                <button onClick={toggleMenu}>
                  <IoIosArrowDropdownCircle size={34} />
                </button>
              </div>
              {menuOpen && (
                <div className="mt-4 grid gap-4">
                  <button onClick={() => goTo('/profile')}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
