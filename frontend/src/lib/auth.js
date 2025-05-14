export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function setUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
}

// utils/auth.js
export const refreshUserData = async () => {
  try {
    const response = await api.get('/auth/me'); // Adjust endpoint as needed
    const freshData = response.data;
    localStorage.setItem('userData', JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error('Failed to refresh user data:', error);
    throw error;
  }
};

export function clearUserData() {
  localStorage.removeItem('userData');
}

export function isAuthenticated() {
  return !!getAuthToken();
}

export function getUserRole() {
  const userData = getUserData();
  return userData?.user?.role || null;
}

export function hasRole(role) {
  const userRole = getUserRole();
  return userRole === role;
}