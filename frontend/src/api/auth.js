import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor for auth token
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleApiError = (error) => {
  if (error.response) {
    throw new Error(
      error.response.data?.message || 
      error.response.data?.error || 
      `Request failed with status ${error.response.status}`
    );
  } else if (error.request) {
    throw new Error('No response from server. Check your network connection.');
  } else {
    throw new Error(`Request setup error: ${error.message}`);
  }
};

// Either use individual exports like this:
const register = async (userData) => {
  try {
    const response = await authAxios.post('/register', userData);
    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const login = async (credentials) => {
  try {
    const response = await authAxios.post('/login', credentials);
    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const googleLogin = async (userData) => {
  try {
    const response = await authAxios.post('/google-login', userData);
    if (response.data?.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const sendOTP = async (email) => {
  try {
    const response = await authAxios.post('/send-otp', { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const response = await authAxios.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await authAxios.post('/reset-password', {
      email,
      otp,
      newPassword
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// OR use this single export block instead of individual exports:

export default {
  register,
  login,
  googleLogin,
  logout,
  sendOTP,
  verifyOTP,
  resetPassword,
  getCurrentUser
};


// But NOT both at the same time