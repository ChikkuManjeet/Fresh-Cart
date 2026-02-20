import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  return (
    <div className="mt-12 pb-16 min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 px-4 md:px-0">
      
      {/* Page Heading (Hero-style) */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-2xl leading-tight animate-fadeInUp">
          My <span className="text-indigo-500">Orders</span>
        </h1>
        <p className="text-gray-600 mt-2 md:mt-4 text-lg md:text-xl">
          Track your past purchases and order details
        </p>
      </div>

      {/* No Orders */}
      {myOrders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto transition-transform hover:scale-[1.01] hover:shadow-2xl"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 mb-6 text-gray-700 text-sm md:text-base">
                <p>
                  <span className="font-semibold text-indigo-500">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-semibold text-indigo-500">Payment:</span> {order.paymentType}
                </p>
                <p>
                  <span className="font-semibold text-indigo-500">Total Amount:</span> ₹{order.amount}
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-100 rounded-2xl p-4 hover:bg-indigo-50 transition cursor-pointer shadow-sm hover:shadow-md"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:5000/images/${item.product.image[0]}`}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover border shadow-sm"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">
                          Category: {item.product.category}
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="mt-4 md:mt-0 flex flex-col gap-1 text-gray-700 text-sm">
                      <p>
                        <span className="font-semibold text-indigo-500">Quantity:</span>{" "}
                        {item.quantity || 1}
                      </p>
                      <p>
                        <span className="font-semibold text-indigo-500">Status:</span>{" "}
                        {item.status || "Processing"}
                      </p>
                      <p>
                        <span className="font-semibold text-indigo-500">Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Amount */}
                    <p className="mt-4 md:mt-0 text-lg font-bold text-indigo-600">
                      ₹{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
