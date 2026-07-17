import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, //*** eta chara token transfer hoy na */
});


axiosInstance.interceptors.response.use(
  (response) => response,
 (error) => {

    if (error.response?.status === 401) {
      console.error("Session expired or unauthorized. Logging out...");

      // (SSR) error face na korte check kore nicci browser e aci kina
      if (typeof window !== "undefined") {
     
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;