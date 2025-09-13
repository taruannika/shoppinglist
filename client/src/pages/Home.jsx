import { Link } from "react-router-dom";
import Product from "../components/Product";
import ShoppingList from "../components/ShoppingList";

const Home = ({ selectedProduct, setSelectedProduct }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <ShoppingList
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default Home;
