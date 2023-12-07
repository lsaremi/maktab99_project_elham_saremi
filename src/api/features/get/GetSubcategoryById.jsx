import { useQuery } from "@tanstack/react-query";
import { instance } from "../../constants";
import { SUBCATEGORIES_URL } from "../../../config";

export const GetSubcategoryById = ({ subCategoryId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["subCategoryData", subCategoryId],
    queryFn: () =>
      instance
        .get(`${SUBCATEGORIES_URL}/${subCategoryId}`)
        .then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <>{data.data.subcategory.name}</>;
};
