import axiosInstance from '../../../services/axiosInstance';
import { IUserSignUpObject } from '../types/user';

const updateUser = (user: IUserSignUpObject) => {
  return axiosInstance.patch(`/doctor/`, user);
};

const getUser = () => {
  return axiosInstance.get(`/doctor/me`);
};

const userService = {
  getUser,
  updateUser,
};

export default userService;
