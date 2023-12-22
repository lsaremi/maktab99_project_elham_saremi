import { useGetAllSubCategories } from "../../../api";

export const SideBarItem = ({ categoryId }) => {
  const subCategoriesArray = [...useGetAllSubCategories()] || [];
  const subOfCategorySelected = subCategoriesArray.filter(
    (sub) => sub.category === categoryId
  );

  return (
    <>
      {subOfCategorySelected.map((sub, index) => (
        // <Link
        //   key={sub.id || index}
        //   to={`/${PRODUCTS_ROUTE}?category=${categoryId}`}
        // >
        <li
          key={sub.id || index}
          className="pr-5 pb-2 text-orange-200 cursor-pointer"
        >
          {sub.name}
        </li>
        // </Link>
      ))}
    </>
  );
};
