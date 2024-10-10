import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://eye-care-api-production.up.railway.app/api/v1',
  // baseURL: 'https://server.hellofromthisgreatandamazing.shop/api/v1',
  baseURL: 'http://localhost:3002/api/v1',
});
export default axiosInstance;
