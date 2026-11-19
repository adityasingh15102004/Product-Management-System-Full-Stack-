import { useEffect, useMemo, useState } from "react";
import {
  createProduct, deleteProduct, getProducts, updateProduct
} from "./services/productService";
import ProductForm from "./components/ProductForm";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import DeleteConfirmation from "./components/DeleteConfirmation";

function getErrorMessage(error, fallback) {
  const data = error.response?.data;
  if (data?.errors) return Object.values(data.errors).flat().join(" ");
  if (data?.message) return data.message;
  if (error.response?.status === 404) return "That product could not be found.";
  if (!error.response) return "Cannot reach the API. Check that the backend is running.";
  return fallback;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  async function loadProducts() {
    setLoading(true);
    try {
      setProducts(await getProducts());
    } catch (error) {
      setNotice({ type: "error", text: getErrorMessage(error, "Unable to load products.") });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => (
    category === "All" ? products : products.filter((p) => p.category === category)
  ), [products, category]);

  async function saveProduct(values) {
    setSaving(true);
    setNotice(null);
    try {
      if (editing) {
        await updateProduct(editing.productId, values);
        setNotice({ type: "success", text: "Product updated successfully." });
      } else {
        await createProduct(values);
        setNotice({ type: "success", text: "Product added successfully." });
      }
      setFormOpen(false);
      setEditing(null);
      await loadProducts();
    } catch (error) {
      setNotice({ type: "error", text: getErrorMessage(error, "Unable to save product.") });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    try {
      await deleteProduct(deleting.productId);
      setDeleting(null);
      setNotice({ type: "success", text: "Product deleted successfully." });
      await loadProducts();
    } catch (error) {
      setDeleting(null);
      setNotice({ type: "error", text: getErrorMessage(error, "Unable to delete product.") });
    }
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand-icon">P</div>
        <div><strong>Northstar</strong><span>PRODUCT MANAGEMENT</span></div>
        <span className="topbar-tag">INVENTORY</span>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow">SHOP ADMINISTRATION</p>
          <h1>Product catalog</h1>
          <p className="muted">Manage products, pricing, and stock levels.</p>
        </div>
        {!formOpen && (
          <button className="button primary" onClick={() => {
            setEditing(null); setFormOpen(true); setNotice(null);
          }}>＋ Add product</button>
        )}
      </section>

      {notice && (
        <div className={`notice ${notice.type}`} role="status">
          {notice.text}
          <button onClick={() => setNotice(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      {formOpen && (
        <section className="card form-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{editing ? "EDIT DETAILS" : "NEW INVENTORY ITEM"}</p>
              <h2>{editing ? "Update product" : "Add a product"}</h2>
            </div>
          </div>
          <ProductForm
            product={editing}
            onSave={saveProduct}
            saving={saving}
            onCancel={() => { setFormOpen(false); setEditing(null); }}
          />
        </section>
      )}

      <section className="card catalog">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">INVENTORY</p>
            <h2>All products <span className="count">{filteredProducts.length}</span></h2>
          </div>
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {loading
          ? <div className="empty-state">Loading products...</div>
          : <ProductList products={filteredProducts}
              onEdit={(product) => { setEditing(product); setFormOpen(true); setNotice(null); }}
              onDelete={setDeleting} />}
      </section>

      <footer>Product Management System · Inventory connected</footer>

      <DeleteConfirmation product={deleting}
        onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
    </main>
  );
}