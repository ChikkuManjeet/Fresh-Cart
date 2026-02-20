import { Routes, Route, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";
import MyOrders from "./pages/MyOrders";
import Auth from "./models/Auth";
import ProductCategory from "./pages/ProductCategory";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import AddAddress from "./pages/AddAddress";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from "./components/seller/SellerLogin";
import AddProducts from "./pages/seller/AddProducts";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";

const App = () => {
  const { isSeller, showUserLogin, loadingUser } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("/seller");

  // Show loader while checking seller or user authentication
  if (isSellerPath && isSeller === null) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Checking seller authentication...
      </div>
    );
  }

  if (!isSellerPath && loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Checking user authentication...
      </div>
    );
  }

  return (
    <div className="text-default bg-default min-h-screen">
      {/* Navbar only for user side */}
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Auth />}
      <Toaster />

      <div className="px-6 md:px-16 lg:px-24">
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/loading" element={<Loading />} />

          {/* Seller routes */}
          <Route
            path="/seller/*"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route path="add-product" element={<AddProducts />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {/* Footer only for user side */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
