import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/apiProducts";
import Product from "../types/Product";

import ModalCreate from "../components/ModalCreate";
import ModalUpdate from "../components/ModalUpdate";
import ModalDelete from "../components/ModalDelete";

import "../assets/css/Table.css";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchProducts = async (page = currentPage) => {
    setLoading(true);

    const res = await getProducts(page, limit);

    setProducts(res.data);
    setCurrentPage(res.pagination.currentPage);
    setTotalPages(res.pagination.totalPages);

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleCreate = async (data: {
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
  }) => {
    try {
      await createProduct(data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product berhasil dibuat",
      });

      setOpenCreate(false);
      fetchProducts();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "There's something wrong",
      });
    }
  };


  // UPDATE
  const handleUpdate = async (data: {
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
  }) => {
    try {
      if (!selectedProduct) return;

      await updateProduct(selectedProduct.id, data);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product updated",
      });

      setOpenUpdate(false);
      fetchProducts();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "There's something wrong",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedProduct) return;

      await deleteProduct(selectedProduct.id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product deleted",
      });

      setOpenDelete(false);
      fetchProducts();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "There's something wrong",
      });
    }
  };


  return (
    <div>
      <h2>Product List</h2>

      <div className="action-add">
        <button
          className="btn btn-add"
          onClick={() => setOpenCreate(true)}>Create New Product</button>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="custom-table" border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.is_active ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      setSelectedProduct(item);
                      setOpenUpdate(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      setSelectedProduct(item);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              margin: "0 4px",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* modals */}
      <ModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      <ModalUpdate
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onSubmit={handleUpdate}
        initialData={
          selectedProduct
            ? {
              name: selectedProduct.name,
              price: selectedProduct.price,
              stock: selectedProduct.stock,
            }
            : undefined
        }
      />

      <ModalDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        productName={selectedProduct?.name}
      />
    </div>
  );
}

export default ProductPage;