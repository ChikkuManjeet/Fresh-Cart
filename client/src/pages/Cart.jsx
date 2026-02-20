import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartItems,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    axios,
    user,
    setCartItems,
  } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Load cart items
  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      if (product) tempArray.push({ ...product, quantity: cartItems[key] });
    }
    setCartArray(tempArray);
  };

  // Load addresses
  const getAddresses = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        const fullAddresses = data.addresses.map((addr) => ({
          name: addr.name || "N/A",
          phone: addr.phone || "N/A",
          street: addr.street || "N/A",
          city: addr.city || "N/A",
          state: addr.state || "N/A",
          zipCode: addr.zipCode || "N/A",
          country: addr.country || "N/A",
        }));
        setAddresses(fullAddresses);
        if (fullAddresses.length > 0) setSelectedAddress(fullAddresses[0]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) getAddresses();
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [cartItems, products]);

  // Place order
  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select a delivery address.");
      if (!user) return toast.error("Please login to place order.");
      if (cartArray.length === 0) return toast.error("Your cart is empty.");

      const orderItems = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const orderAddress = { ...selectedAddress };

      if (paymentOption === "COD") {
        const { data } = await axios.post(
          "/api/order/cod",
          { items: orderItems, address: orderAddress },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          setCartArray([]);
          navigate("/my-orders");
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      } else {
        const { data } = await axios.post(
          "/api/order/stripe",
          { items: orderItems, address: orderAddress },
          { withCredentials: true }
        );

        if (data.success) {
          if (data.url) {
            window.location.href = data.url;
          } else {
            console.error("Stripe URL missing:", data);
            toast.error("Stripe checkout URL not available.");
          }
        } else {
          toast.error(data.message || "Failed to create Stripe session.");
        }
      }
    } catch (error) {
      console.error("Place Order Error:", error.response || error);
      toast.error(error.response?.data?.message || error.message || "Server error.");
    }
  };

  const calculateTax = () => Math.floor(totalCartAmount() * 0.05);
  const calculateTotal = () => totalCartAmount() + calculateTax();

  if (!cartArray || cartArray.length === 0)
    return <p className="text-center py-20 text-gray-600 text-lg">Your cart is empty.</p>;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 rounded-2xl shadow-lg">
      
      {/* LEFT: Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
          Shopping Cart <span className="text-sm text-indigo-500">{cartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-base font-semibold pb-3 border-b border-gray-300">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200
                       hover:bg-white/50 transition-colors rounded-lg p-2 cursor-pointer shadow-sm mb-2"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  className="max-w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold text-gray-700">{product.name}</p>
                <div className="font-normal text-gray-500/70 flex items-center mt-1">
                  <p>Qty:&nbsp;</p>
                  <select
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                    value={cartItems[product._id]}
                    className="outline-none border border-gray-300 rounded px-2"
                  >
                    {Array(Math.max(product.quantity, 9))
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center text-indigo-600 font-semibold">₹{product.offerPrice * product.quantity}</p>

            <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto text-red-500 hover:text-red-600">
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium hover:underline"
        >
          Continue Shopping
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="max-w-[360px] w-full bg-white p-5 max-md:mt-16 border border-gray-200 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-indigo-700">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Delivery Address */}
        <p className="text-sm font-semibold uppercase">Delivery Address</p>
        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-600 text-sm">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-500 hover:underline cursor-pointer text-sm ml-3"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-12 left-0 bg-white border border-gray-300 text-sm w-full rounded shadow-lg z-10">
              {addresses.map((addr, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className="text-gray-600 hover:bg-indigo-50 p-2 cursor-pointer"
                >
                  {addr.street}, {addr.city}, {addr.state}, {addr.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-50"
              >
                Add New Address
              </p>
            </div>
          )}
        </div>

        {/* Payment Option */}
        <p className="text-sm font-semibold uppercase mt-6">Payment Method</p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded-lg"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-4" />

        {/* Price Summary */}
        <div className="text-gray-600 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600 font-semibold">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹{calculateTax()}</span>
          </p>
          <p className="flex justify-between text-lg font-bold mt-3">
            <span>Total Amount:</span>
            <span>₹{calculateTotal()}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition rounded-2xl"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
