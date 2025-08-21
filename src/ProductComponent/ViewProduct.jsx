// src/ProductComponent/ViewProduct.jsx
import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";
import styles from "../ProductComponent/ViewProduct.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getAllProducts,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Services/ProductService";
import { getCategories } from "../Services/CategoryService";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      setErrorMsg("Failed to load products: " + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!search.trim()) fetchProducts();
    else handleSearch(search);
  }, [search]);

  const handleSearch = async (keyword) => {
    try {
      const results = await searchProducts(keyword);
      setProducts(results);
    } catch (err) {
      console.error("Search error:", err);
      setProducts([]);
    }
  };

  const handleViewDetails = async (product_id) => {
    try {
      const product = await getProductById(product_id);
      setSelectedProduct({
      ...product,
      img: product.img || "https://via.placeholder.com/300",
      newImgFile: null, // reset any previously selected file
    });
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateProduct(
        selectedProduct.product_id,
        selectedProduct
      );

      // Update modal state with new image if uploaded
      setSelectedProduct((prev) => ({
        ...prev,
        img:
          selectedProduct.newImgFile
            ? URL.createObjectURL(selectedProduct.newImgFile)
            : prev.img,
        newImgFile: null, // reset file input
      }));

      alert("Product updated successfully!");
      fetchProducts(); // refresh grid
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(selectedProduct.product_id);
      alert("Product deleted successfully!");
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Product List</h2>
          <input
            type="text"
            placeholder="Search product by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.productsGrid}>
          {products.length > 0 ? (
            products.map((prd) => (
              <div key={prd.product_id} className={styles.card}>
                <img
                  src={prd.img || "https://via.placeholder.com/150"}
                  alt={prd.product_name}
                  className={styles.productImg}
                />
                <div className={styles.cardContent}>
                  <h3>{prd.product_name}</h3>
                  <div className={styles.cardFooter}>
                    <p className={styles.price}>₹{prd.product_price}</p>
                    <button
                      onClick={() => handleViewDetails(prd.product_id)}
                      className={styles.viewLink}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No products found
            </p>
          )}
        </div>

        {selectedProduct && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedProduct(null)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedProduct(null)}
              >
                ✖
              </button>

              <form onSubmit={handleUpdate} className={styles.modalContent}>
                <img
                  src={
                    selectedProduct.newImgFile
                      ? URL.createObjectURL(selectedProduct.newImgFile)
                      : selectedProduct.img || "https://via.placeholder.com/300"
                  }
                  alt={selectedProduct.product_name}
                  className={styles.modalImg}
                />
                <label>Product Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      newImgFile: e.target.files[0],
                    })
                  }
                />

                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <label>Product Name:</label>
                    <input
                      type="text"
                      value={selectedProduct.product_name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          product_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formCol}>
                    <label>Price:</label>
                    <input
                      type="number"
                      value={selectedProduct.product_price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          product_price: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <label>Stock:</label>
                    <input
                      type="number"
                      value={selectedProduct.stock_threshold || ""}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock_threshold: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formCol}>
                    <label>Status:</label>
                    <select
                      value={selectedProduct.status}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <label>Category:</label>
                    <select
                      value={String(selectedProduct.category_id)}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          category_id: parseInt(e.target.value),
                        })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={String(cat.category_id)}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.updateBtn} >
                    <FaEdit style={{ marginRight: "5px",fontSize:"1.8rem" }} />Update 
                  </button>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={handleDelete}
                  >
                   <FaTrash style={{marginRight:"5px",fontSize:"1.8rem"}}/>Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
