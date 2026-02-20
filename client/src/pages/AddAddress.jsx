import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { user, navigate, axios } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) navigate("/cart");
  }, [user, navigate]);

  return (
    <div className="mt-12 p-6 rounded-lg">
      <div
        className="
          flex flex-col md:flex-row gap-8 
          bg-gradient-to-br from-gray-50 to-gray-100 
          p-8 rounded-2xl shadow-lg border border-gray-200
        "
      >
        {/* Address Form */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Address
          </h2>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Zip Code</label>
              <input
                type="number"
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                type="number"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 ring-indigo-400"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="
                w-full bg-indigo-500 hover:bg-indigo-600 
                text-white py-3 rounded-lg font-medium 
                shadow-md transition-all
              "
              >
                Save Address
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={assets.add_address_iamge}
            alt="Address Illustration"
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
