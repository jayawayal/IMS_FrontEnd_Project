import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout"; // wrapper
import { addProduct } from "../Services/ProductService"; // API call
import { getCategories } from "../Services/CategoryService"; // fetch categories
import styles from "../ProductComponent/AddProduct.module.css";

export default function AddProduct() {
  // form state
  const [product_name, setProductName] = useState("");
  const [product_qty, setProductQty] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [stock_threshold, setStockThreshold] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [status, setStatus] = useState("true"); // default value
  const [img, setImg] = useState(null);
  const[successMsg,setSuccessMessage]=useState("");
  const[errorMsg,setErrorMessage]=useState("");
  // preview
  const [preview, setPreview] = useState(null);

  // categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!category_id) {
    alert("Please select a category.");
    return;
  }

  const formData = new FormData();
  formData.append("product_name", product_name);
  formData.append("product_qty", parseInt(product_qty));
  formData.append("category_id", parseInt(category_id));
  formData.append("stock_threshold", parseInt(stock_threshold));
  formData.append("product_price", parseFloat(product_price));
  formData.append("status", status==="true");
  if (img) formData.append("img", img);

  try {
    const res = await addProduct(formData);
    setSuccessMessage(res.message || "Product added successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);
    setProductName("");
    setProductQty("");
    setCategoryId("");
    setStockThreshold("");
    setProductPrice("");
    setStatus("true");
    setImg(null);
    setPreview(null);
  } catch (error) {
    console.error("Error adding product:", error);
    setErrorMessage(error.response?.data?.message || "Something went wrong.");
    setTimeout(() => setErrorMessage(""), 5000);
  }
};

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h2 className={styles.heading}>➕ Add New Product</h2>

            {/* Messages */}
            {successMsg && <div className={`${styles.message} ${styles.success}`}>{successMsg}</div>}
            {errorMsg && <div className={`${styles.message} ${styles.error}`}>{errorMsg}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          {/* Category Dropdown */}
          <select
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={product_qty}
            onChange={(e) => setProductQty(e.target.value)}
            required
          />

          {/* Stock Threshold */}
          <input
            type="number"
            placeholder="Stock Threshold"
            value={stock_threshold}
            onChange={(e) => setStockThreshold(e.target.value)}
            required
          />

          {/* Product Price */}
          <input
            type="number"
            step="0.01"
            placeholder="Product Price"
            value={product_price}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />

          {/* Status Dropdown */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div className={styles.preview}>
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            Add Product
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
