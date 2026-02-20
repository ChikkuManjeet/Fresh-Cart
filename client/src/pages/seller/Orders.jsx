import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Seller <span className="text-indigo-600">Orders</span>
        </h2>

        {/* No Orders */}
        {orders.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No orders found.</p>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 md:p-6 transition hover:shadow-md"
            >
              <div className="grid md:grid-cols-[2fr_2fr_1fr_1fr] gap-6 items-center">

                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    className="w-16 h-16 rounded-lg object-cover border"
                    src={`http://localhost:5000/images/${order.items[0].product.image[0]}`}
                    alt="product"
                  />
                  <div className="flex flex-col justify-center">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="font-medium text-gray-800 leading-5">
                        {item.product.name}
                        {item.quantity > 1 && (
                          <span className="text-indigo-600"> × {item.quantity}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">
                    {order.address.name}
                  </p>
                  <p className="leading-5">
                    {order.address.street}, {order.address.city}, {order.address.state},{" "}
                    {order.address.zipCode}, {order.address.country}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-lg font-semibold text-gray-900">
                  ₹{order.amount}
                </div>

                {/* Payment Details */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    Method: <span className="font-medium">{order.paymentType}</span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium">{order.orderDate}</span>
                  </p>

                  <p>
                    Payment:{" "}
                    <span
                      className={`font-semibold ${
                        order.isPaid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;
