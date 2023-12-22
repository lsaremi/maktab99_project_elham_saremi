import { Link } from "react-router-dom";
import { useGetAllCategories } from "../../../api";
import { SideBarItem } from "../../Base";
import { PRODUCTS_ROUTE } from "../../../config";

export const SideBar = () => {
  const categoriesArray = [...useGetAllCategories()];

  return (
    <div className="fixed w-[20%] max-h-full p-8 mt-36 border-l-2 border-orange-500">
      {categoriesArray.map((cat, index) => (
        <div className="my-6" key={cat.id || index}>
          <Link to={`/${PRODUCTS_ROUTE}?category=${cat.id}`}>
            <h3 className="text-lg text-orange-500 mb-1 cursor-pointer">
              {cat.name}
            </h3>
          </Link>

          <ul>
            <SideBarItem categoryId={cat.id} />
          </ul>
        </div>
      ))}
    </div>
  );
};
