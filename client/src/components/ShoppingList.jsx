import { getProducts } from "../api/api";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ShoppingList = ({ selectedProduct, setSelectedProduct }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (products.length <= 0)
    return (
      <div className="text-center">
        <p>You have 0 products in your shopping list</p>
        <Link className="link link-primary" to={"/create"}>
          Start Adding products
        </Link>
      </div>
    );

  return (
    <div className=" flex flex-col gap-2 w-full max-w-xl  mx-auto">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
};

export default ShoppingList;
