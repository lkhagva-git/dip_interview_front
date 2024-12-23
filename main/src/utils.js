import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


/**
 * Handles success responses for development purposes
 * @param {Object} response - Axios response object
 * @returns {Object} - Data from response
 */
const handleSuccess = (response) => {
  // console.log("Request Successful:", response);
  return response.data;
};


/**
 * Handles error responses
 * @param {Object} error - Axios error object
 * @throws Will throw an error with a custom message
 */
const handleError = (error) => {
  if (error.response) {
    console.error("Error Response:", error.response);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error("No Response:", error.request);
    throw new Error('No response received from the server');
  } else {
    console.error("Error Message:", error.message);
    throw new Error(error.message || 'Request setup error');
  }
};


/**
 * Generic POST request
 * @param {string} url - API endpoint
 * @param {Object} data - Payload for the request
 * @returns {Object} - Data from the response
 */
export const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};


/**
 * Generic GET request
 * @param {string} url - API endpoint
 * @returns {Object} - Data from the response
 */
export const getRequest = async (url) => {
  try {
    const response = await api.get(url);
    return handleSuccess(response);
  } catch (error) {
    handleError(error);
  }
};


// Specific API functions using the generic functions

/**
 * Logs in the user
 * @param {Object} data - { username: '', password: '' }
 * @returns {Object} - Token from the response
 */
export const loginFetch = async (data) => {
  return await postRequest('/api/token/', data);
};

/**
 * Fetches the smart anket data (protected route)
 * @returns {Object} - Data from the response
 */
export const getSmartAnket = async () => {
  return await getRequest('/api/smart_anket/');
};
