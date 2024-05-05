import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Detail from "../components/Promo/Detail";
import Dashboard from "../pages/Dashboard/Dashboard";
import Banner from "../pages/Dashboard/Banner";
import Categories from '../pages/Dashboard/Categories'
import Destination from '../pages/Dashboard/Destination'
import Destinations from '../pages/Destination'
import Promo from '../pages/Dashboard/Promo'
import User from '../pages/Dashboard/User'
import Profil from "../pages/Auth/Profil";
import DataDetail from "../pages/Dashboard/DataDetail";
import Category from "../pages/Category";
import Destinationbycategory from "../pages/Details/Destinationbycategory";
import DestinationUsers from '../pages/Details/Destination'
export const AuthUser = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]
export  const routeList = [
    {
        path:"/profile",
        element:<Profil/>
    },
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/detail/:id", // Note the :id parameter
       element: <Detail />
    },
    {
        path:'/category',
        element:<Category/>
    },
    {
        path:'/destination',
        element:<Destinations/>
    },
    {
        path:'/destination/:id',
        element:<DestinationUsers/>
    },

      {
       path:'/destinationbycategory/:id',
        element:<Destinationbycategory/>
    },
    
];
export const DashboardRoute = [

    {
        path:"/dashboardadmin",
        element:<Dashboard />
    },
    {
        path:"/dashboard/banner",
        element:<Banner />,
    },
    {
        path:"/dashboard/categories",
        element:<Categories/>,
    },
    {
        path:"/dashboard/destination",
        element:<Destination/>,
    },
    {
        path:"/dashboard/promo",
        element:<Promo/>,
    },

    {
        path:"/dashboard/user",
        element:<User/>,
    },
    {
        path:"/dashboard/:links/:id",
        element:<DataDetail/>
    }
    
]