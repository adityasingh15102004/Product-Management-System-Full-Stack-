export default function DeleteConfirmation({ product, onCancel, onConfirm }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <div className="modal-icon">!</div>
        <h2 id="delete-title">Delete product?</h2>
        <p>Are you sure you want to delete <strong>{product.productName}</strong>?</p>
        <div className="form-actions">
          <button className="button secondary" onClick={onCancel}>Cancel</button>
          <button className="button delete-button" onClick={onConfirm}>Delete product</button>
        </div>
      </section>
    </div>
  );
}