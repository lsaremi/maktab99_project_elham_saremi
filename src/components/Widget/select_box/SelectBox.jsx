import { useState } from "react";
import { useGetAllCategories } from "../../../api";

export const SelectBox = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryArray = [...useGetAllCategories()] || [];

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <label>
      <select
        value={selectedCategory}
        className="bg-transparent outline-none cursor-pointer"
        name="selectedCategory"
        onChange={handleCategoryChange}
      >
        <option className="bg-[#525252] p-4 cursor-pointer" value="all">
          تمام دسته بندی
        </option>
        {categoryArray.map((category, index) => (
          <option
            className="bg-[#525252] p-4 cursor-pointer"
            key={category.id || index}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
};
