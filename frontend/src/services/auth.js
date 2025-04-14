import api from './api';

export const registerVendor = async (formData) => {
  try {
    const response = await api.post('/register', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data.data; // Just return data, don't set tokens here
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};