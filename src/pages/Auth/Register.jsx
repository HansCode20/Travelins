import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import travel from "../../assets/Images/People Travel (1).jpg";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import {} from 'react-hook-form'
const Register = () => {
  const [register, setRegister] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    role: "admin",
    profilePictureUrl: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Periksa panjang password
    if (e.target.name === "password" || e.target.name === "passwordRepeat") {
      if (e.target.value.length < 6) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleRegister = () => {
    setLoading(true);

    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.passwordRepeat ||
      !formData.role ||
      !formData.phoneNumber
    ) {
      toast.warning("Please fill in all required fields");
      setLoading(false);
    } else if (formData.password !== formData.passwordRepeat) {
      toast.warning("Password does not match");
      setLoading(false);
    } else if (passwordError) {
      // Jangan melakukan registrasi jika ada kesalahan panjang password
      toast.warning("Please fix password errors");
      setLoading(false);
    } else {
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register`,
          formData,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setRegister(res.data);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          toast.success("Register Success");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            toast.error("Invalid input. Please check again ");
          } else if (err.response.status === 409) {
            toast.warning("Email or Name already exists");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  console.log(register);

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-center ">
        <div className="relative flex flex-col m-6 space-y-8  shadow-2xl rounded-2xl md:flex-row md:space-y-0  bg-opacity-50 ">
          <div className="hidden md:block p-6">
            <img
              src={travel}
              alt="img"
              className="w-[650px] h-full rounded-2xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-14 w-full">
            <span className="mb-3 text-4xl font-bold">
              Sign <span className="text-[green]">Up</span>
            </span>
            <span className="text-gray-800 mb-8">
              Welcome! Please enter your details
            </span>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="py-2 sm:w-1/2">
                <span className="mb-2 text-md">Name</span>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="py-2 sm:w-1/2">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="py-2 w-full">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="new-password"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  style={{ width: "calc(100% - 8px)" }}
                />
                {passwordError && (
                  <span className="text-red-500 text-sm">{passwordError}</span>
                )}
              </div>
              <div className="py-2 w-full">
                <span className="mb-2 text-md">Repeat Password</span>
                <input
                  type="password"
                  name="passwordRepeat"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formData.passwordRepeat}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  style={{ width: "calc(100% - 8px)" }}
                />
                {passwordError && (
                  <span className="text-red-500 text-sm">{passwordError}</span>
                )}
              </div>
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Phone Number</span>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Role</span>
              <select
                type="role"
                name="role"
                onChange={handleChange}
                value={formData.role}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="py-2">
              <span className="mb-2 text-md">Profile Picture</span>
              <input
                type="file"
                name="profilePictureUrl"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-2/4 mx-auto bg-black text-white rounded-xl m-2 p-[15px] hover:bg-[green] hover:text-white "
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
            <div className="text-center text-gray-400">
              You have an account?
              <Link to="/login">
              <span className="font-bold text-black"> Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
