import api from "@/lib/api";

export const register = async (formData) => {
  try {
    const response = await api.post("/register", formData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data.data; // Just return data, don't set tokens here
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
