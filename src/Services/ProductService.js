// src/services/productService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

// Helper to get auth headers
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Add new product
export const addProduct = async (formData) => {
  try {
   const response = await axios.post(`${API_URL}/add`, formData, {
      headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update existing product
export const updateProduct = async (product_id, productData) => {
  try {
    const formData = new FormData();
    formData.append("product_name", productData.product_name);
    formData.append("product_price", productData.product_price);
    formData.append("stock_threshold", productData.stock_threshold);
    formData.append("status", productData.status);
    formData.append("category_id", productData.category_id);

    if (productData.newImgFile) formData.append("img", productData.newImgFile);

    const response = await axios.put(`${API_URL}/updatePrd/${product_id}`, formData, {
      headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
    });

    // Return the updated product including the new image URL
    return response.data.updatedProduct; 
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (product_id) => {
  try {
    const response = await axios.delete(`${API_URL}/deletePrd/${product_id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/view`, { headers: getAuthHeader() });
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Search product by keyword
export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/searchchPrd/${keyword}`, {
      headers: getAuthHeader(),
    });
    return response.data.products || [];
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (product_id) => {
  try {
    const response = await axios.get(`${API_URL}/search/${product_id}`, {
      headers: getAuthHeader(),
    });
    return response.data.product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
