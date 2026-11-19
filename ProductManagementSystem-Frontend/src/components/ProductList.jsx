export default function ProductList({ products, onEdit, onDelete }) {
  if (!products.length) {
    return <div className="empty-state">No products found.</div>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="product-title">{product.productName}</td>
              <td><span className="category-pill">{product.category}</span></td>
              <td>{Number(product.price).toLocaleString("en-IN", {
                style: "currency", currency: "INR"
              })}</td>
              <td>
                {product.stockQuantity}
                {product.stockQuantity < 5 && <span className="low-stock">Low stock</span>}
              </td>
              <td className="actions">
                <button className="link-button" onClick={() => onEdit(product)}>Edit</button>
                <button className="link-button danger" onClick={() => onDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}