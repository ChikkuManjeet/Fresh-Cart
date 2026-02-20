import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";

const SellerLayout = () => {
  const { isSeller, setIsSeller, navigate } = useContext(AppContext);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller/add-product", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="
        md:w-64 w-20 
        bg-white 
        border-r border-gray-200 
        flex flex-col 
        py-5 
        shadow-lg
      ">
        <h1 className="text-xl font-bold text-center text-orange-600 mb-6 hidden md:block">
          Seller Panel
        </h1>

        {sidebarLinks.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end
            className={({ isActive }) =>
              `
              flex items-center py-3 px-4 gap-4
              transition-all duration-300 rounded-lg mx-2 mb-1
              ${
                isActive
                  ? "bg-orange-100 text-orange-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `
            }
          >
            <img src={item.icon} alt="" className="w-6 h-6" />
            <p className="hidden md:block">{item.name}</p>
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => {
            setIsSeller(false);
            navigate("/");
          }}
          className="
            mt-auto mx-4 mb-4 
            border border-gray-300 
            text-sm px-3 py-2 rounded-md 
            text-gray-700 
            hover:bg-gray-100 
            transition-all
          "
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
