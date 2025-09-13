import axios from "axios";

const URL = "/api/v1/products";

export const getProducts = async () => {
  const response = await axios.get(URL);
  return response.data;
};

export const updateProduct = async (id, updated) => {
  const response = await axios.patch(`${URL}/${id}`, updated);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${URL}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(URL, product);
  return response.data;
};
