import axios from 'axios';

// Set up the axios instance with a base URL (update the URL to your API endpoint)
const api = axios.create({
  baseURL: 'http://localhost:8001', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set an Authorization header (useful if using JWT tokens or other auth methods)
export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};

// GET request
export const getRequest = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST request
export const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PUT request
export const putRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE request
export const deleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle error
const handleError = (error) => {
  // You can customize the error handling based on the error structure from your API
  if (error.response) {
    // Request made and server responded
    console.error('Error Response:', error.response);
    throw new Error(error.response.data.message || 'Something went wrong');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error Request:', error.request);
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request
    console.error('Error Message:', error.message);
    throw new Error(error.message);
  }
};
