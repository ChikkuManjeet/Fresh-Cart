import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]); // ✅ Add filtered products state

  // Check if seller is authenticated
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
      console.error("Seller auth error:", error.message);
    }
  };

  // Check if user is authenticated
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/users/is-auth");
      if (data.success) {
        setUser(data.user);

        // Load cart from DB when user logs in
        if (data.user.cartItems) {
          setCartItems(data.user.cartItems);
        } else if (data.user.cart) {
          setCartItems(data.user.cart);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.error("User auth error:", error.message);
    }
  };

  // Fetch all product data
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error.message);
    }
  };

  // ✅ Filter products by category
  const filterProductsByCategory = (category) => {
    if (!category) return [];
    const filtered = products.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase() === category.toLowerCase()
    );
    setCategoryProducts(filtered);
    return filtered;
  };

  // Add product to cart
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems || {});
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // Total cart items count
  const cartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  // Total cart amount
  const totalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (p) => p.id === itemId || p._id === itemId
      );
      if (itemInfo) {
        total += cartItems[itemId] * itemInfo.offerPrice;
      }
    }
    return Math.floor(total * 100) / 100;
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      delete cartData[itemId];
      toast.success("Item removed from cart");
      setCartItems(cartData);
    }
  };

  // Sync cart with DB whenever it changes (and user is logged in)
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Cart sync error:", error.message);
      }
    };

    if (user && user._id) {
      updateCart();
    }
  }, [cartItems, user]);

  // Clear cart on logout
  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      setUser(null);
      setCartItems({});
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // Load data on app start
  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    cartItems,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
    logoutUser,
    fetchUser,
    setCartItems,
    categoryProducts, 
    filterProductsByCategory, 
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
