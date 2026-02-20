import React from "react";

const NewsLetter = () => {
  return (
    <div className="mt-20 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-md 
                    py-12 px-6 md:px-14 flex flex-col items-center text-center space-y-4">

      <h1 className="md:text-4xl text-2xl font-semibold text-gray-900">
        Never Miss a Deal!
      </h1>

      <p className="md:text-lg text-gray-600 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form className="flex items-center max-w-xl w-full h-12 md:h-14">
        <input
          className="flex-1 h-full border border-gray-300 rounded-l-xl outline-none px-4 
                     text-gray-600 bg-white focus:ring-2 focus:ring-indigo-400 transition"
          type="email"
          placeholder="Enter your email"
          required
        />

        <button
          type="submit"
          className="px-8 md:px-12 h-full bg-indigo-600 text-white font-medium rounded-r-xl 
                     hover:bg-indigo-700 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
