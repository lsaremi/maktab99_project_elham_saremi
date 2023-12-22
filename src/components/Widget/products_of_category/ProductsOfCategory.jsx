import { useGetAllProducts } from "../../../api";
import { Card } from "../card";

export const ProductsOfCategory = ({ selectedCategory = "" }) => {
  const [products] = useGetAllProducts(1, 6, selectedCategory);

  return (
    <>
      {Array.isArray(products) &&
        products.map((product, index) => (
          <Card
            key={product.name || index}
            name={product.name}
            price={product.price.toLocaleString()}
            rate={product.rate}
            img={product.images[0]}
          />
        ))}
    </>
  );
};
