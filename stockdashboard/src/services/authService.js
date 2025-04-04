import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ✅ Signup Function
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });

    if (response.data.userId) {
      localStorage.setItem("userId", response.data.userId);
      return response.data;
    } else {
      throw new Error("Signup failed!");
    }
  } catch (error) {
    throw error;
  }
};

// ✅ Login Function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.userId) {
      localStorage.setItem("userId", response.data.userId);
      return response.data;
    } else {
      throw new Error("Login failed!");
    }
  } catch (error) {
    throw error;
  }
};

// ✅ Check if User is Authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

// ✅ Logout Function
export const logout = () => {
  localStorage.removeItem("userId");
};
