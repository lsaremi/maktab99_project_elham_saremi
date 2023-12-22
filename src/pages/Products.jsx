import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearchParams, Link } from "react-router-dom";
import { Card, SideBar } from "../components";
import { PRODUCTS_URL, PRODUCT_ROUTE } from "../config";
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
      <div className="flex flex-col items-center gap-y-10 mr-80 mt-28">
        <h2 className="self-center mt-10 px-10 text-orange-500 text-3xl font-bold">
          <GetCategoryById categoryId={categoryId} />
        </h2>
        <div className="grid grid-cols-2 gap-y-10 gap-x-10 mb-8">
          {data?.data?.products?.map((product, index) => (
            <Link
              to={`/${PRODUCT_ROUTE}${product._id}`}
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

// const {
//   data,
//   error,
//   // fetchNextPage,
//   // hasNextPage,
//   // isFetchingNextPage,
//   isFetching,
// } = useInfiniteQuery({
//   queryKey: ["products", categoryId],
//   // queryFn: getPage,
//   queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
//   config: {
//     keepPreviousData: true,
//     getNextPageParam: (lastPage) => lastPage.data.nextCursor,
//     staleTime: 30000,
//   },
// });
// console.log("data", data);

// if (isFetching && data?.pages.length === 0) return "loading...";

// if (error) return "An error has occurred: " + error.message;
