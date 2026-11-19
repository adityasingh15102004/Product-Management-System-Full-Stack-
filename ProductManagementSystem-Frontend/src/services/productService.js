import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getProducts() {
  const response = await api.get("");
  return response.data;
}

export async function createProduct(product) {
  const response = await api.post("", product);
  return response.data;
}

export async function updateProduct(id, product) {
  await api.put(`/${id}`, product);
}

export async function deleteProduct(id) {
  await api.delete(`/${id}`);
}