import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Modal from "./components/Modal";
import { useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div>
      <div className="navbar bg-primary text-primary-content flex items-center justify-between">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          ShoppingList
        </button>
        <button className="btn " onClick={() => navigate("/create")}>
          Add
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          }
        />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Modal product={selectedProduct} />
    </div>
  );
};

export default App;
