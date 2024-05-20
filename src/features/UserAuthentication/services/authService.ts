import axios from 'axios';
import { API_URL } from '../constants';
import { IUserLoginObject, IUserSignUpObject } from '../types/user';

const signUp = (user: IUserSignUpObject) => {
  return axios.post(`${API_URL}/user/signup`, user);
};

const login = (userCredentials: IUserLoginObject) => {
  return axios.post(`${API_URL}/user/login`, userCredentials);
};

const authService = {
  signUp,
  login,
};

export default authService;
