import React, { useEffect, useState } from 'react'
import Logo from '../assets/Images/Logos.jpg'
import {useSelector} from 'react-redux'
import  axios  from 'axios'
import MenuProfile from '../components/UtilsFeature/MenuProfile'
import { isOpen } from '../feature/action'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapMarked } from "react-icons/fa";
import { AiFillDashboard } from 'react-icons/ai'
import { Toaster, toast } from 'sonner'
import { FaHome } from "react-icons/fa";
function Navbar() {
const dispatch = useDispatch()
const [navIsOpen,setNavisOpen] = useState(false)
const [menuOpen,setMenuOpen] = useState(false)
  const [user,setUser] = useState(null)
  const tokenLocal =  JSON.parse(localStorage.getItem('token')) 
  console.log(tokenLocal)
  const usersData = () =>{
      if(tokenLocal){
        axios
        .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization:`Bearer ${tokenLocal}`
            },
        })
        .then((res) => {
            console.log(res.data.data);
            setUser(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }
  const navigate = useNavigate()
  useEffect(()=>{
    usersData()
    console.log(user)
  },[])
  const [isPress,setIsPress] = useState(false)
  const setOpenTab  = (e) =>{
    e.preventDefault()
    setMenuOpen(!menuOpen)
    setIsPress(!isPress)
  }
  const CloseNaviationSm = (e) =>{
    e.preventDefault()
    setMenuOpen(false)
    setNavisOpen(!isOpen)
  }
  const goTo = (url) =>{
    
    navigate(url)
        setMenuOpen(false)
        setNavisOpen(!navIsOpen)
  }
  const logOut = (e)=>{
    const getToken = JSON.parse(localStorage.getItem('token')) 
      e.preventDefault()
      axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
      { 
      headers:{
        apiKey:'24405e01-fbc1-45a5-9f5a-be13afcd757c',
        Authorization:`Bearer ${getToken}`
      }
    }).then((res)=>{
      console.log(res)
      toast.success(`${res.data.message}`)
      setTimeout(()=>{
        setSuccess(false)
      },1800)
      setSuccess(true)
    }).catch((err)=>{
      console.log(err)
      toast.error('Logout failed')
    }).finally(()=>{
      
    })
      localStorage.removeItem('token')
      window.location.reload()
      
    }
  return (
    <div className='p-2 z-40 shadow-b-2 border-b shadow-lg   '>
        <div className='flex justify-between'>
        <div className='mx-5'>
          <button onClick={()=>navigate('/')}>
            <img src={Logo} alt="Logo" className='w-20 rounded-full' />
          </button>
        </div>
        <Toaster></Toaster>
        <div className='flex  items-center mx-5 gap-5 font-bold'>
          <div className='hidden sm:flex gap-4 '>
            <button onClick={()=>navigate('/destination')}>Destination</button>
            <button onClick={()=>navigate('/category')}>Category</button>
            {user?.role == 'admin' &&
            <button onClick={()=>navigate('/dashboardadmin')}>Dashboard</button>
            }
          </div>
{tokenLocal ? 
<>
<div className=' z-40 gap-4 hidden  sm:flex justify-center items-center'>
  <div className='grid  place-items-center'>
  <MenuProfile/>
      <h1>{user?.name}</h1>
      <p className='text-[10px] px-1 rounded-md text-center w-fit bg-slate-800 text-white text-sm '>{user?.role}</p>
    </div>
      <button onClick={()=>dispatch(isOpen())}   className='w-fit h-fit'>
      <img className='rounded-full max-sm:w-8 max-sm:h-8 w-12 h-12 object-center object-cover' src={user?.profilePictureUrl}></img>
        </button>
      </div>
      <button  onClick={()=>setNavisOpen(!navIsOpen)} className='sm:hidden block'>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#242424" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
      </button>

</>
:

<a href='/login' className=' text-white bg-black p-3 rounded-xl hover:bg-white hover:text-black'>Login</a>

}
<div className= {`${navIsOpen == !false ? 'block' :'hidden'} animation-mobile z-50 sm:hidden w-screen fixed h-svh top-0 right-0 bg-white`} >
        <button onClick={CloseNaviationSm} className= {`rotate flex justify-end w-full p-4`}><IoCloseOutline size={42 } /></button>
       <div className='gap-6 grid place-content-center place-items-center mt-10'>
        <button className='flex gap-3 items-center text-3xl' onClick={()=>goTo('/')}><FaHome/>Home</button>
        <button className='flex gap-3 items-center text-3xl' onClick={()=>goTo('/destination')}><FaLocationDot/>Destination</button>
        <button className='flex gap-3 items-center text-3xl' onClick={()=>goTo('/category')}><FaMapMarked/>Category</button>
        { user?.role == 'admin' && 
        <button className='flex items-center gap-3 text-3xl' onClick={()=>goTo('/dashboardadmin')}><AiFillDashboard />Dashboard</button> 
        }
      
       </div>
       <div className={`animationMenu scale-110 flex justify-center w-full  mt-4 px-4 py-1   `}>
        <div className='flex w-fit p-4  shadow-md shadow-slate-600 rounded-lg justify-center'>
         <div className=''>
       {tokenLocal && 
       <>
        <div className='  flex border-b-2 border-gray-600 gap-4 p-1  items-center'>
          
  <div className='grid place-items-center'>
      <h1>{user?.name}</h1>
      <p className='text-[10px] px-1 rounded-md text-center w-fit bg-slate-800 text-white text-sm '>{user?.role}</p>
    </div>
      <button onClick={()=>dispatch(isOpen())}   className='w-fit h-fit'>
      <img className='rounded-full max-sm:w-8 max-sm:h-8 w-12 h-12 object-center object-cover' src={user?.profilePictureUrl}></img>
        </button>
        <button className={`${isPress ? 'rotationMenuButton' : ''}`}  onClick={setOpenTab}>
          <IoIosArrowDropdownCircle color='#aeae' size={34}/>
        </button>
        </div>

       <div className={`${menuOpen == false ? 'hidden ' : 'block'} grid gap-4`}>
            <span>
              <button onClick={()=>goTo('/profile')}>Profil</button>
            </span>  
            <span>
              <button onClick={logOut}>Logout</button>
          
            </span>
       </div>
        
       </>
    }
    </div>
    </div>
          </div>

         </div>



        
            
        </div>
        </div>
    </div>
  )
}

export default Navbar