import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token in headers
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      console.error("Unauthorized access - redirecting to login");
    } else if (error.response.status === 403) {
      // Handle forbidden access
      console.error(
        "Forbidden access - you do not have permission to view this resource"
      );
    } else if (error.response.status === 500) {
      // Handle server error
      console.error("Server error - please try again later");
    }
    return Promise.reject(error);
  }
);

export default client;
