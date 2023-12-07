import { Link } from "react-router-dom";
import { PRODUCTS_ROUTE } from "../config";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={PRODUCTS_ROUTE}>categories</Link>
    </>
  );
};

export default Home;
