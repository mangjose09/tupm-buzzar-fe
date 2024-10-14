import axios from "axios";

// Create the Axios instance with base URL and credentials
const buzzar_api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
  withCredentials: true,
});

// // Function to refresh the JWT token
// async function refreshToken() {
//   try {
//     const storedToken = localStorage.getItem("digi-base");
//     const token = storedToken ? JSON.parse(storedToken) : null;

//     if (!token || !token.refresh) {
//       throw new Error("No refresh token available");
//     }

//     const response = await buzzar_api.post("/v2/auth/jwt/refresh/", {
//       refresh: token.refresh,
//     });

//     const newToken = {
//       ...token,
//       access: response.data.access,
//       refresh: response.data.refresh,
//     };
//     localStorage.setItem("digi-base", JSON.stringify(newToken));
//   } catch (error) {
//     console.error("Error fetching refresh token:", error);
//     throw error; // Handle logout or token expiration if needed
//   }
// }

// // Request interceptor to add the JWT token to headers
// buzzar_api.interceptors.request.use(
//   (config) => {
//     const storedToken = localStorage.getItem("digi-base");
//     const token = storedToken ? JSON.parse(storedToken) : null;

//     if (token && token.access) {
//       config.headers.Authorization = `JWT ${token.access}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle token expiration and retry requests
// buzzar_api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         await refreshToken();
//         const storedToken = localStorage.getItem("digi-base");
//         const token = storedToken ? JSON.parse(storedToken) : null;

//         buzzar_api.defaults.headers.common[
//           "Authorization"
//         ] = `JWT ${token.access}`;
//         return buzzar_api(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError); // Handle token refresh failure
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default buzzar_api;
