import axios from "axios";
import Product from "../types/Product";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async (
  page = 1,
  limit = 5
): Promise<{
  data: Product[];
  pagination: {
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}> => {
  const res = await api.get("/products", {
    params: {
      page,
      limit,
    },
  });

  return {
    data: res.data.data,
    pagination: res.data.pagination,
  };
};


export const createProduct = async (
  data: Pick<Product, "name" | "price" | "stock">
): Promise<Product> => {
  const res = await api.post("/products", data);
  return res.data.data;
};

export const updateProduct = async (
  id: number,
  data: Pick<Product, "name" | "price" | "stock">
): Promise<Product> => {
  const res = await api.put(`/products/${id}`, data);
  return res.data.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
