
import axiosInstance from '../../../services/axiosInstance';
import { IUserLoginObject, IUserSignUpObject } from '../types/user';

const signUp = (user: IUserSignUpObject) => {
  return axiosInstance.post(`/doctor/signup`, user);
};

const login = (userCredentials: IUserLoginObject) => {
  return axiosInstance.post(`/doctor/login`, userCredentials);
};

const authService = {
  signUp,
  login,
};

export default authService;
