import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        className="hidden md:block w-full h-[600px] object-cover rounded-b-3xl shadow-2xl"
      />
      <img
        src={assets.main_banner_bg_sm}
        className="md:hidden w-full h-[400px] object-cover rounded-b-3xl shadow-2xl"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center 
        pb-24 md:pb-0 md:pl-8 lg:pl-24 bg-gradient-to-t from-black/50 to-transparent">
        
        {/* Animated Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white text-center md:text-left 
          max-w-md md:max-w-xl leading-snug lg:leading-tight drop-shadow-2xl animate-fadeInUp">
          Freshness you can <span className="text-yellow-400">Trust</span>, Savings you will <span className="text-green-400">Love</span>
        </h1>

        {/* Buttons with Hover Animations */}
        <div className="flex flex-col sm:flex-row items-center mt-6 gap-4 sm:gap-6">
          
          <Link
            to={"/products"}
            className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white 
              font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10">Shop</span>
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="transition-transform group-hover:translate-x-2 duration-300"
            />
            {/* Animated Background Glow */}
            <span className="absolute inset-0 bg-green-400 opacity-20 rounded-full blur-xl animate-pulse-slow"></span>
          </Link>

          <Link
            to={"/products"}
            className="flex items-center gap-2 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-green-900 
              font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10">Explore Deals</span>
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="transition-transform group-hover:translate-x-2 duration-300"
            />
            <span className="absolute inset-0 bg-yellow-300 opacity-20 rounded-full blur-xl animate-pulse-slow"></span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Hero;
