import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller/add-product");
    }
  }, [isSeller, navigate]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        navigate("/seller/add-product");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    !isSeller && (
      <div className="fixed top-0 bottom-0 right-0 left-0 z-40 flex items-center justify-center 
        bg-black/40 backdrop-blur-sm">

        {/* Login Card */}
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={submitHandler}
          className="flex flex-col gap-5 items-start p-8 py-10 w-80 sm:w-[370px] rounded-2xl 
            shadow-2xl border border-white/30 bg-white/80 backdrop-blur-xl animate-fadeIn"
        >
          {/* Heading */}
          <p className="text-3xl font-bold m-auto text-gray-700">
            <span className="text-indigo-600">Seller</span> Login
          </p>

          {/* Email */}
          <div className="w-full">
            <p className="text-sm font-medium text-gray-600">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full p-2.5 mt-1 rounded-lg bg-gray-50 border border-gray-300 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <p className="text-sm font-medium text-gray-600">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full p-2.5 mt-1 rounded-lg bg-gray-50 border border-gray-300 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition"
              type="password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 w-full py-2.5 rounded-lg text-white 
            font-medium text-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
