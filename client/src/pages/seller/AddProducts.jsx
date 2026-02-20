import React, { useContext, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProducts = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("category", category);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setCategory("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 border border-gray-200">
        
        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Add New <span className="text-indigo-600">Product</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Image Upload Section */}
          <div>
            <p className="text-base font-medium text-gray-700">Product Images</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {Array(4).fill("").map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    hidden
                    id={`image${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />
                  <div className="w-28 h-28 border rounded-lg overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                    <img
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : assets.upload_area
                      }
                      alt="Upload"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="text-base font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter product name"
              required
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-base font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Enter product description"
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-indigo-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-base font-medium text-gray-700">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((c, index) => (
                <option key={index} value={c.path}>
                  {c.path}
                </option>
              ))}
            </select>
          </div>

          {/* Prices */}
          <div className="flex gap-5 flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <label className="text-base font-medium text-gray-700">Price</label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="₹0"
                required
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-indigo-500"
              />
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="text-base font-medium text-gray-700">Offer Price</label>
              <input
                type="number"
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                placeholder="₹0"
                required
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 outline-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium shadow-md hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
