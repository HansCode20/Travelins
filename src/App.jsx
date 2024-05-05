import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import {routeList} from "./Routes/routes";
 import { DashboardRoute } from "./Routes/routes";
import DashboardLayout from "./fragments/DashboardLayout";
import Layout from "./fragments/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthUser } from "./Routes/routes";
import UserloginCheck from "./utils/UserloginCheck";
const App = () => {
  return (
    <Router>
      <Routes> 
        <Route element={<UserloginCheck/>}>
        {AuthUser.map((route,index)=>(
          <Route key={index} path={route.path} element={route.element}></Route>
        ))}
        </Route>
        <Route element={<Layout />}>
          {routeList.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))} 
          </Route>
          <Route element={<PrivateRoutes/>}>
          <Route element={<DashboardLayout />}>
        {DashboardRoute.map((route, index) => (
          <Route  key={index} path={route.path} element={route.element} />
        ))}
        </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
