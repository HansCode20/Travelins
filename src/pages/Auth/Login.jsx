import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import travel from "../../assets/Images/People Travel (2).jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../feature/login";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login`,
        { email, password },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.role);
        toast.success("Login Successful");
          localStorage.setItem('token',JSON.stringify(res.data.token))
          if(res.data.data.role == 'admin'){
            navigate('/dashboardadmin')
          }else{
          navigate("/")
        }
       dispatch(logIn(res.data))  
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Wrong email or password");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="relative p-8">
            <img
              src={travel}
              alt="img"
              className="w-[440px] h-full hidden rounded-2xl md:block object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">
              Log<span className="text-[green]">in</span>
            </span>
            <span className="text-gray-800 mb-8">
              Welcome back! Please enter your details
            </span>

            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              disabled={loading}
              onClick={handleLogin}
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-[green] hover:text-white "
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-center text-gray-400">
              Don't have an account?
              <Link to="/register">
                <span className="font-bold text-black"> Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
