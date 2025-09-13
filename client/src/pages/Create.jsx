import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const client = useQueryClient();

  const [productName, setProductName] = useState("");

  // create product
  const createProductMutation = useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      client.invalidateQueries(["products"]);
      navigate("/");
    },
    onError: () => {
      setProductName("");
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-xl">Add products to Shopping List</h1>
      <form
        className="p-2 flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          createProductMutation.mutate({ name: productName });
        }}
      >
        <input
          type="text"
          placeholder="Product name..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input input-xl w-full"
        />
        <button className="btn btn-primary w-full">Add Product</button>
      </form>
      {createProductMutation.error && (
        <p className="text-red-500">
          {createProductMutation.error?.response?.data?.message}
        </p>
      )}
    </div>
  );
};

export default Create;
