import React from "react";

const CategoriesSelector = ({
  categories,
  currentCategory,
  onCategoryChange,
}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`py-2 px-4 rounded-lg border ${
            currentCategory === category
              ? "bg-[#EEF7E7] text-brandPurple border-[#C6E4AF] text-12px md:text-14px"
              : "bg-white text-gray-600 border-gray-300 text-12px md:text-14px"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoriesSelector;
