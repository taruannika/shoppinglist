import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { deleteProduct, updateProduct } from "../api/api";

const Product = ({ product, setSelectedProduct }) => {
  const client = useQueryClient();

  // update product
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updated }) => updateProduct(id, updated),
    onSuccess: () => client.invalidateQueries(["products"]),
  });

  // delete product
  const deleteProductMutation = useMutation({
    mutationFn: ({ id }) => deleteProduct(id),
    onSuccess: () => client.invalidateQueries(["products"]),
  });
  return (
    <div
      className={`bg-base-300 text-base-content p-2 rounded-sm shadow-md flex flex-col gap-2  justify-between ${
        product.purchased ? "line-through opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p>{product.name}</p>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs"
            disabled={product.purchased}
            onClick={() =>
              updateProductMutation.mutate({
                id: product.id,
                updated: {
                  quantity: product.quantity <= 1 ? 1 : product.quantity - 1,
                },
              })
            }
          >
            <FaMinus />
          </button>

          <p className="text-xl">{product.quantity}</p>
          <button
            className="btn btn-xs"
            disabled={product.purchased}
            onClick={() =>
              updateProductMutation.mutate({
                id: product.id,
                updated: { quantity: product.quantity + 1 },
              })
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          type="checkbox"
          checked={product.purchased}
          onChange={() =>
            updateProductMutation.mutate({
              id: product.id,
              updated: { purchased: !product.purchased },
            })
          }
          className="checkbox checkbox-md"
        />
        <div className="flex items-center gap-2">
          <button
            disabled={product.purchased}
            className="btn btn-primary btn-sm"
            onClick={() => {
              setSelectedProduct(product);
              document.getElementById("my_modal_1").showModal();
            }}
          >
            <FaRegEdit />
          </button>

          <button
            className="btn btn-sm btn-primary"
            onClick={() => deleteProductMutation.mutate({ id: product.id })}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
