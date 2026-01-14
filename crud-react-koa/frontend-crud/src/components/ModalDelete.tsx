import "../assets/css/Modal.css";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
  }
  
  export default function ModalDelete({
    open,
    onClose,
    onConfirm,
    productName,
  }: Props) {
    if (!open) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Delete Product</h3>
          <p>
            Are you sure want to delete <b>{productName}</b>?
          </p>
  
          <div className="modal-actions">
            <button onClick={onConfirm} style={{ color: "red" }}>
              Delete
            </button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  