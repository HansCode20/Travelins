import { FaHome } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { BiCategoryAlt, BiSolidDiscount } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
const iconSize = 34
const SideBarList =[
    {
       path:'/',
       name:'home',
       image:<FaHome size={iconSize} />
    },
    {
    path:'/dashboardadmin',
    name:'dashboard',
    image:<MdOutlineDashboard size={iconSize}/>
    },
    {
        path:"/dashboard/banner",
        name:'banner',
        image:<IoMdImages size={iconSize}/>
     },
    {
        path:"/dashboard/categories",
        name:"categories",
        image: <BiCategoryAlt size={iconSize}/>
      },
    {
        path:"/dashboard/destination",
        name:"destination",
        image:<FaMapLocationDot size={iconSize}/>
    },
    {
        path:"/dashboard/promo",
        name:'promo',
        image:<BiSolidDiscount size={iconSize} />
    },
    {
        path:"/dashboard/user",
        name:'user',
        image:<FaUserFriends size={iconSize}/>
    }   
]

export default SideBarList