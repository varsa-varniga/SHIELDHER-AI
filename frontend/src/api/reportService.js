import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const submitCyberReport = async (reportData) => {
  try {
    // Frontend validation
    const errors = [];
    if (!reportData.incidentType) {
      errors.push('Incident type is required');
    }
    if (!reportData.email) {
      errors.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(reportData.email)) {
      errors.push('Email is invalid');
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const response = await api.post('/reports', reportData);
    return response.data;
  } catch (error) {
    console.error('Error details:', {
      config: error.config,
      response: error.response?.data,
      status: error.response?.status
    });
    
    let errorMessage;
    if (error.response?.data?.errors) {
      errorMessage = error.response.data.errors.join(', ');
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.message || 'Failed to submit report. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

export const getReportById = async (id) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Failed to fetch report'
    );
  }
};