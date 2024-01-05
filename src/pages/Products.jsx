import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearchParams, Link } from "react-router-dom";
import { Card, SideBar } from "../components";
import { PRODUCTS_ROUTE, PRODUCTS_URL, PRODUCT_ROUTE } from "../config";
import { GetCategoryById, instance } from "../api";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const { isPending, error, data } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () =>
      instance
        .get(
          `${PRODUCTS_URL}?limit=1000&${
            categoryId !== "category=all" ? `category=${categoryId}` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 30000,
  });

  if (isPending) return "loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <SideBar />
      <Outlet />
      <div className="flex flex-col items-center gap-y-10 mt-28 mr-28 md:mr-40 lg:mr-80">
        <h2 className="self-center mt-10 px-10 text-orange-500 text-3xl font-bold">
          <GetCategoryById categoryId={categoryId} />
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-10 mb-8 ml-8 md:ml-12 lg:grid-cols-2">
          {data?.data?.products?.map((product, index) => (
            <Link
              to={`/${PRODUCTS_ROUTE}/${product._id}`}
              key={product.id || index}
            >
              <Card
                name={product.name}
                price={product.price.toLocaleString()}
                rate={product.rate}
                img={product.images[0]}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
