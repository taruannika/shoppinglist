import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/api";
import { useEffect, useState } from "react";

const Modal = ({ product }) => {
  const client = useQueryClient();
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updated }) => updateProduct(id, updated),
    onSuccess: () => client.invalidateQueries(["products"]),
  });
  const [inputValue, setInputValue] = useState(product?.name || "");

  useEffect(() => {
    setInputValue(product?.name || "");
  }, [product]);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <input
          type="text"
          className="input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-warning"
              onClick={() => setInputValue(product?.name || "")}
            >
              Close
            </button>
            <button
              className="btn"
              onClick={() =>
                updateProductMutation.mutate({
                  id: product.id,
                  updated: { name: inputValue },
                })
              }
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
