import axiosInstance from '../../axios.config';

const handleLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    // Handle response
  } catch (error) {
    // Handle error
  }
}; 