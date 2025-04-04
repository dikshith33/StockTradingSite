import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure this matches backend

// ✅ Get userId from localStorage (Fixes Missing ID Issue)
const getUserId = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("❌ No userId found in localStorage! User must log in.");
    return null; // ✅ Return null instead of throwing an error
  }
  return userId;
};

// ✅ Buy Stocks (Now using userId)
export const buyStock = async (symbol, name, quantity, price) => {
  try {
    const userId = getUserId();
    if (!userId) {
      alert("Please log in first!"); // ✅ Show user-friendly error
      return;
    }

    const response = await axios.post(`${API_URL}/stocks/buy`, {
      userId,
      symbol,
      name,
      quantity,
      price,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Buy Stock API Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch User Portfolio (Now using userId)
export const fetchPortfolio = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      alert("Please log in first!"); // ✅ Show user-friendly error
      return;
    }

    const response = await axios.get(`${API_URL}/stocks/portfolio?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Portfolio Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Sell Stocks (Now using userId)
export const sellStock = async (symbol, quantity, price) => {
  try {
    const userId = getUserId();
    if (!userId) {
      alert("Please log in first!"); // ✅ Show user-friendly error
      return;
    }

    const response = await axios.post(`${API_URL}/stocks/sell`, {
      userId,
      symbol,
      quantity,
      price,
    });

    return response.data; // ✅ Return API response
  } catch (error) {
    console.error("❌ Internal Server Error:", error.message, error.stack);
    
    // ✅ Instead of using response.status(500), return an error object
    return { error: "Internal server error", details: error.message };
  }
};

 

// ✅ Fetch User Balance (Now using userId)
export const getUserBalance = async () => {
  try {
    const userId = getUserId(); // ✅ Ensure userId is retrieved
    if (!userId) {
      console.error("❌ No userId found in localStorage!");
      return { error: "User not logged in" };
    }

    const url = `http://localhost:5000/api/user/balance/${userId}`;
    console.log(`📡 Fetching balance from: ${url}`); // ✅ Log the full URL

    const response = await axios.get(url);
    
    console.log("✅ Balance API Response:", response.data); // ✅ Log response
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching balance:", error.response?.data || error.message);
    return { error: "Failed to fetch balance" };
  }
};


