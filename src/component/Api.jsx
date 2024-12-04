import axios from "axios";
import { jwtDecode } from "jwt-decode";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("Document Cookies:", document.cookie);

    const accesstoken = getCookie("accesstoken");
    if (!accesstoken) {
      console.error("Access token not found in cookies.");
      return Promise.reject(error);
    }

    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      console.error("Refresh token not found in cookies.");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          '/refresh-token',
          {}, 
          { 
            withCredentials: true, 
            headers: { 'Authorization': `Bearer ${refreshToken}` } 
          }
        );
        console.log(response,"response")

        const newAccessToken = response.data.accesstoken;
        console.log("New Access Token:", newAccessToken);

        const decoded = jwtDecode(newAccessToken);
        const senderId = decoded.user_id;  
        console.log('Sender ID:', senderId);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest); 
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = '/login'; 
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
