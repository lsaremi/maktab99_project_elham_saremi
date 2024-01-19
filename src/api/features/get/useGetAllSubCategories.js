import { useQuery } from "@tanstack/react-query";
import { SUBCATEGORIES_URL } from "../../../config";
import { instance } from "../../constants";

export const useGetAllSubCategories = (selectedCategory) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["subCategoryData", selectedCategory],
    queryFn: () => instance.get(`${SUBCATEGORIES_URL}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return data.data.subcategories.map((subcategory) => ({
    key: subcategory._id,
    name: subcategory.name,
    id: subcategory._id,
    category: subcategory.category,
  }));
};
