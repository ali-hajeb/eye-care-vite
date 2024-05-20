import axios from 'axios';
import { API_URL } from '../constants';

const getUserProfile = (username: string) => {
  return axios.get(`${API_URL}/user/${username}`);
};

const userService = {
  getUserProfile,
};

export default userService;
