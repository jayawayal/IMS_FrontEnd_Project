import axios from "axios";

const API_URL = "http://localhost:3000/api/categories/viewCat"; 

export const getCategories = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};
