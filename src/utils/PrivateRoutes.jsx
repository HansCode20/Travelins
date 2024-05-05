import { Outlet, Navigate } from "react-router-dom";
import { fetchExternalData } from "./fetching";
import { useEffect, useState } from "react";
import Loader from "../components/UI/Loader";

const PrivateRoutes = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetchExternalData('user');
        const userRole = result.data.role;
        setRole(userRole);
        console.log(userRole);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  if (role === null) {
    // Menampilkan loading atau indikator lainnya jika masih menunggu data
    return  <Loader/>
  }

  return (
    <>
      {role === 'admin' ? (
        <Outlet />
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
};

export default PrivateRoutes;
