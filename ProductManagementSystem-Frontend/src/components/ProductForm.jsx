import { useEffect, useState } from "react";

const categories = ["Electronics", "Grocery", "Clothing", "Other"];
const emptyForm = { productName: "", category: "", price: "", stockQuantity: "" };

export default function ProductForm({ product, onSave, onCancel, saving }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(product ? {
      productName: product.productName,
      category: product.category,
      price: String(product.price),
      stockQuantity: String(product.stockQuantity),
    } : emptyForm);
    setErrors({});
  }, [product]);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.productName.trim()) nextErrors.productName = "Product name is required.";
    if (!categories.includes(form.category)) nextErrors.category = "Choose a category.";
    if (form.price === "" || !Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0.";
    }
    if (form.stockQuantity === "" || !Number.isInteger(Number(form.stockQuantity)) ||
        Number(form.stockQuantity) < 0) {
      nextErrors.stockQuantity = "Stock must be a whole number of 0 or greater.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSave({
      productName: form.productName.trim(),
      category: form.category,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
    });
  }

  return (
    <form className="product-form" onSubmit={submit} noValidate>
      <label>
        Product name
        <input name="productName" value={form.productName} onChange={change} maxLength="100" />
        {errors.productName && <small className="field-error">{errors.productName}</small>}
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={change}>
          <option value="">Choose a category</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        {errors.category && <small className="field-error">{errors.category}</small>}
      </label>

      <label>
        Price (₹)
        <input name="price" type="number" min="0.01" step="0.01"
          value={form.price} onChange={change} />
        {errors.price && <small className="field-error">{errors.price}</small>}
      </label>

      <label>
        Stock quantity
        <input name="stockQuantity" type="number" min="0" step="1"
          value={form.stockQuantity} onChange={change} />
        {errors.stockQuantity && <small className="field-error">{errors.stockQuantity}</small>}
      </label>

      <div className="form-actions">
        <button className="button primary" disabled={saving}>
          {saving ? "Saving…" : product ? "Save changes" : "Add product"}
        </button>
        <button className="button secondary" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}