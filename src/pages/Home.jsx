import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../config";
import { useGetAllCategories } from "../api/features/get/useGetAllCategories";
import { ProductsOfCategory } from "../components/Widget/products_of_category";
import machine from "../assets/images/cat-images/daryan-shamkhali-NRZAwYyaYNk-unsplash.jpg";
import mug from "../assets/images/cat-images/albert-s-FkNfVgHVzkI-unsplash.jpg";
import coffee from "../assets/images/cat-images/immo-wegmann-REqK8jIAtv8-unsplash.jpg";

const imagesArray = [
  {
    name: "ابزار تهیه قهوه",
    img: { machine },
  },
  { name: "ابزار سرو قهوه", img: { mug } },
  { name: "انواع قهوه", img: { coffee } },
];

const Home = () => {
  const categoriesArray = [...useGetAllCategories()] || [];

  const resultArray = categoriesArray.map((category) => {
    const matchingImage = imagesArray.find(
      (image) => image.name === category.name
    );

    return {
      key: category.id,
      name: category.name,
      id: category.id,
      icon: category.icon,
      image: matchingImage
        ? matchingImage.img[Object.keys(matchingImage.img)[0]]
        : null,
    };
  });

  return (
    <div className="container mx-auto mt-32 flex flex-col items-start mr-10 justify-between">
      <div className="flex flex-col my-5 gap-20 mr-20 mb-10">
        {resultArray.map((cat, index) => (
          <div key={cat.id || index} className="flex items-start gap-16">
            <Link to={`/${PRODUCTS_ROUTE}?category=${cat.id}`}>
              <div className="relative">
                <img
                  alt="category-img"
                  src={cat.image}
                  className="w-[200px] h-[200px] rounded-full object-cover border-2 border-orange-500"
                />
                <div className="absolute w-[200px] px-5 py-3 bg-neutral-800 border-2 border-orange-500 rounded-full text-white font-bold items-center flex justify-center -bottom-2">
                  {cat.name}
                </div>
              </div>
            </Link>
            <div className="grid grid-cols-2 items-center gap-5 ">
              <ProductsOfCategory selectedCategory={cat.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
