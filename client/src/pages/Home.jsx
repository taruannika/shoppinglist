import { Link } from "react-router-dom";
import Product from "../components/Product";
import ShoppingList from "../components/ShoppingList";

const Home = ({ selectedProduct, setSelectedProduct }) => {
  const shoppingList = [1];
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center w-full px-2">
      {shoppingList.length > 0 ? (
        <ShoppingList
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ) : (
        <div className="text-center">
          <p className="text-lg">
            You dont have any products in your shopping list 😔
          </p>
          <p>
            <Link className="link link-primary" to={"/create"}>
              Start adding products
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
