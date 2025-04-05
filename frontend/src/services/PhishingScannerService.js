import axios from "axios";

// Constants for API endpoints
const URL_API_ENDPOINT = "http://127.0.0.1:5002/predicturl"; // URL scanning endpoint
const IMAGE_API_ENDPOINT = "http://127.0.0.1:5001/predict";  // Image scanning endpoint

/**
 * Sends a request to check if a URL is a phishing site
 * @param {string} url - The URL to check
 * @returns {Promise<Object>} - The scan results
 */
export const checkPhishingLink = async (url) => {
  try {
    const response = await axios.post(URL_API_ENDPOINT, { url });
    
    console.log("URL Backend Response:", JSON.stringify(response.data, null, 2));
    
    // Transform the response to match the frontend's expected format
    return {
      isPhishing: response.data.prediction === "Phishing",
      riskScore: response.data.phishing_probability,
      prediction: response.data.prediction,
      note: response.data.note
    };
  } catch (error) {
    console.error("Error checking phishing link:", error);
    return {
      error: error.message || "Failed to analyze phishing link",
      isPhishing: false,
      riskScore: 0
    };
  }
};

/**
 * Sends an image file to the backend for phishing detection
 * @param {FormData} formData - FormData containing the image file with key 'image'
 * @returns {Promise<Object>} - The scan results
 */
export const scanFile = async (formData) => {
  try {
    const response = await fetch(IMAGE_API_ENDPOINT, {
      method: "POST",
      body: formData,
      // No need to set Content-Type when using FormData,
      // the browser will set it automatically with boundary
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to scan file");
    }
    
    const data = await response.json();
    console.log("Image Backend Response:", data);
    
    return data;
  } catch (error) {
    console.error("Error in scanFile service:", error);
    throw error;
  }
};