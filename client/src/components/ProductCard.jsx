import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {
  const { navigate, addToCart, cartItems, removeFromCart } = useContext(AppContext)
  const [count, setCount] = useState(0);

  if (!product) return null;

  return (
    <div
      onClick={() => navigate(`/product/${product.category}/${product.id || product._id}`)}
      className="relative group rounded-2xl min-w-[13rem] max-w-[13rem] w-full cursor-pointer 
                 bg-white shadow-md hover:shadow-xl border border-gray-200
                 hover:border-indigo-300 transition-all duration-300 
                 hover:scale-[1.03] p-4 flex flex-col items-center
                 bg-gradient-to-br from-indigo-50 via-white to-yellow-50"
    >

      {/* Subtle Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40
                      bg-gradient-to-tr from-indigo-200/40 via-pink-200/30 to-yellow-200/40 
                      blur-xl transition duration-500 pointer-events-none"></div>

      {/* Product Image */}
      <div className="flex items-center justify-center px-2 z-10">
        <img
          src={`http://localhost:5000/images/${product.image[0]}`}
          alt={product.name || 'product'}
          className="group-hover:scale-110 transition-transform duration-300 
                     max-w-[9rem] md:max-w-[11rem] rounded-xl"
        />
      </div>

      {/* Category */}
      <p className="text-gray-500/70 text-xs mt-2 z-10">{product.category}</p>

      {/* Name */}
      <p className="font-semibold text-sm md:text-base text-gray-800 truncate mt-1 z-10">
        {product.name}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-0.5 mt-1 z-10">
        {Array(5).fill('').map((_, i) =>
          product.rating > i ? (
            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="#615FFF" />
          ) : (
            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="#615FFF55" />
          )
        )}
        <p className="text-gray-500 text-xs ml-1">{product.rating}</p>
      </div>

      {/* Price + Add Button */}
      <div
        className="flex items-end justify-between mt-3 w-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="md:text-xl text-base font-semibold text-indigo-600">
          ₹{product.offerPrice || product.price}{' '}
          {product.offerPrice && (
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ₹{product.price}
            </span>
          )}
        </p>

        <div className="text-indigo-500" onClick={(e) => e.stopPropagation()}>
          {!cartItems?.[product._id] ? (
            <button
              className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 
                         md:w-[80px] w-[64px] h-[34px] rounded-xl text-indigo-600 
                         font-medium hover:bg-indigo-200 transition"
              onClick={() => addToCart(product._id)}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] 
                            bg-indigo-500/25 rounded-xl select-none">
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer text-md px-2 h-full"
              >
                -
              </button>

              <span className="w-5 text-center">{cartItems[product._id]}</span>

              <button
                onClick={() => { addToCart(product._id); setCount(count + 1); }}
                className="cursor-pointer text-md px-2 h-full"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
