import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { AppContext } from '../context/AppContext'  

const Category = () => {
    const {navigate} = useContext(AppContext);
  return (
    <div className='mt-16'>
      <p className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800 drop-shadow-md leading-snug">
  Categories
</p>
      <div className=' my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center mt-6'>
        {categories.map((category, index) => (
          <div
           onClick={()=>{
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0,0);
           }}
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center hover:bg-gray-100 transition"
            style={{backgroundColor: category.bgColor}}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-28 transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
