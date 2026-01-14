import { useState, useEffect } from "react";
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
}

export default function ModalCreate({
    open, onClose, onSubmit
}: Props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!open) {
            setName("");
            setPrice("");
            setStock("");
            setIsActive(true);
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = () => {
        onSubmit({
            name,
            price: Number(price),
            stock: Number(stock),
            is_active: isActive,
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Create New Product</h3>

                <label className="form-label">Name</label>
                <input
                    type="text"
                    value={name}
                    placeholder="Input name of product"
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="form-label">Price</label>
                <input
                    type="number"
                    value={price ?? ""}
                    placeholder="Input price of product"
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                />

                <label className="form-label">Stock</label>
                <input
                    type="number"
                    value={stock ?? ""}
                    placeholder="Input stock of product"
                    onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                />

                <label className="form-label">Status</label>
                <select
                    value={String(isActive)}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                    disabled
                >
                    <option value="true">Active</option>
                </select>

                <div className="modal-actions">
                    <button
                        className="btn-submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    <button onClick={onClose}>Cancel</button>
                </div>

            </div>

        </div>
    )
}