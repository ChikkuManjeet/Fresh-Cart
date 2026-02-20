import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, fetchProducts, axios } = useContext(AppContext);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          All <span className="text-indigo-600">Products</span>
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Table */}
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 font-semibold text-left">Product</th>
                <th className="px-6 py-3 font-semibold text-left">Category</th>
                <th className="px-6 py-3 font-semibold text-left hidden md:table-cell">
                  Selling Price
                </th>
                <th className="px-6 py-3 font-semibold text-left">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-600">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/images/${product.image[0]}`}
                      alt="Product"
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <p className="font-medium">{product.name}</p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 hidden md:table-cell font-semibold">
                    ₹{product.offerPrice}
                  </td>

                  {/* Stock Toggle */}
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                        className="sr-only peer"
                      />

                      {/* Toggle Track */}
                      <div className="w-12 h-7 bg-gray-300 rounded-full 
                        peer-checked:bg-indigo-600 transition-all"></div>

                      {/* Toggle Knob */}
                      <span
                        className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full 
                      shadow-sm transition-transform peer-checked:translate-x-5"
                      ></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default ProductList;
