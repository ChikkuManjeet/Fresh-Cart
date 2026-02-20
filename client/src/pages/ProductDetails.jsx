import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((product) => product.id === id || product._id === id);

  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full px-6 mt-16">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        <Link to={"/"}>Home</Link> /{" "}
        <Link to={"/products"}>Products</Link> /{" "}
        {product.category && (
          <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link>
        )}{" "}
        / <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16">
        {/* Thumbnails */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border border-gray-300 rounded overflow-hidden cursor-pointer max-w-[80px] h-[80px]"
              >
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-300 rounded overflow-hidden max-w-[400px] h-[400px]">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(product.rating) ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-gray-500 line-through">MRP: ₹{product.price}</p>
            <p className="text-2xl font-medium">Price: ₹{product.offerPrice}</p>
            <span className="text-gray-500">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mb-2">About Product</p>
          <ul className="list-disc ml-5 text-gray-600">
            {product.description?.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full sm:w-auto py-3 px-6 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full sm:w-auto py-3 px-6 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
