import axios from "axios";

const buzzar_api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
  withCredentials: true,
});

export default buzzar_api;