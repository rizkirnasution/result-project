import { useEffect, useState } from "react";
import "../assets/css/Modal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
  }) => void;
  initialData?: {
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
  };
}

export default function ModalUpdate({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setStock(initialData.stock);
      setIsActive(initialData.is_active);
    }
  }, [initialData]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Update Product</h3>

        <label className="form-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label">Price</label>
        <input
          type="number"
          value={price.toLocaleString("id-ID") ?? ""}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <label className="form-label">Stock</label>
        <input
          type="number"
          value={stock ?? ""}
          onChange={(e) =>
            setStock(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <label className="form-label">Status</label>
          <select
            value={String(isActive)}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>


        <div className="modal-actions">
          <button
            className="btn-submit"
            onClick={() =>
              onSubmit({
                name,
                price: Number(price),
                stock: Number(stock),
                is_active: isActive,
              })
            }
          >
            Update
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
