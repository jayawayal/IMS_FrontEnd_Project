// src/services/customerService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/customer"; // adjust if needed

// Add Customer
export const addCustomer = async (customerData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/addCustomer`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const getCustomers = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/viewCustomer`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // will return array of customers
  } catch (err) {
    throw err.response?.data || { message: "Error fetching customers" };
  }
};

export const deleteCustomer = async (customer_id, token) => {
  const res = await axios.delete(`${API_URL}/deleteCust/${customer_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCustomerById = async (customer_id, token) => {
  const response = await axios.get(
    `${API_URL}/searchCustById/${customer_id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


// Update customer (basic structure)
export const updateCustomer = async (customer_id, updatedData, token) => {
  const res = await axios.put(
    `${API_URL}/updateCust/${customer_id}`,
    updatedData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
