import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Loading = () => {
  const { navigate } = useContext(AppContext);
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`${nextUrl}`);
      }, 5000);

      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-indigo-500"></div>
      <p className="mt-4 text-gray-700 text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
