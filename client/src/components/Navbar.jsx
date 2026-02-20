import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
  } = useContext(AppContext);

  useEffect(() => {
    if (searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  return (
    <nav
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
      bg-white border-b border-gray-200 shadow-md sticky top-0 z-50 backdrop-blur-sm transition-all"
    >
      {/* Logo */}
      <Link to={"/"}>
        <h1
          className="text-3xl font-extrabold tracking-tight text-green-600 hover:text-green-700
          drop-shadow-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          Fresh Cart
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 font-medium text-gray-700">

        <Link className="hover:text-green-600 hover:scale-105 transition duration-200" to={"/"}>
          Home
        </Link>

        <Link className="hover:text-green-600 hover:scale-105 transition duration-200" to={"/products"}>
          All Products
        </Link>

        {/* Search Bar */}
        <div
          className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full bg-gray-50
          hover:border-green-500 focus-within:border-green-600 shadow-sm transition-all"
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400 text-sm"
            type="text"
            placeholder="Search fresh items..."
          />

          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:scale-110 transition transform duration-200"
        >
          <img src={assets.cart_icon} alt="" className="w-7 h-7" />

          <button
            className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-[18px] h-[18px] 
            flex items-center justify-center rounded-full shadow-md animate-pulse"
          >
            {cartCount()}
          </button>
        </div>

        {/* User Section */}
        {user ? (
          <div className="relative group">
            {/* Profile Icon */}
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 h-10 cursor-pointer rounded-full ring-1 ring-gray-300 
              hover:scale-110 transition duration-200"
            />

            {/* Dropdown */}
            <ul
              className="
                absolute top-12 right-0 w-40 bg-white shadow-xl border border-gray-200 
                rounded-lg py-2 text-sm z-50

                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
              "
            >
              <li
                onClick={() => navigate('/my-orders')}
                className="px-4 py-2 hover:bg-green-50 cursor-pointer"
              >
                My Orders
              </li>

              <li
                onClick={() => setUser(null)}
                className="px-4 py-2 hover:bg-green-50 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2 bg-green-600 hover:bg-green-700 text-white 
            rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
            transition-all duration-200"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-xl 
        py-4 flex-col items-start gap-3 px-6 text-sm md:hidden`}
      >
        <Link className="hover:text-green-600 transition duration-200" to={"/"}>
          Home
        </Link>

        <Link className="hover:text-green-600 transition duration-200" to={"/products"}>
          All Products
        </Link>

        {user ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/my-orders")}
              className="text-left hover:text-green-600 transition duration-200"
            >
              My Orders
            </button>

            <button
              onClick={() => setUser(null)}
              className="text-left hover:text-green-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2 bg-green-600 hover:bg-green-700 
            text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
