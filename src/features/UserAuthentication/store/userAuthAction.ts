import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userLocalStorageKey } from '../constants';
import {
  IUserLoginObject,
  IUserRedux,
  IUserResponseObject,
  IUserSignUpObject,
} from '../types/user';
import { logout } from './userSlice';
import userService from '../services/userService';
import authService from '../services/authService';
import axiosInstance from '../../../services/axiosInstance';

const updateUser = createAsyncThunk(
  'auth/update',
  async (user: IUserSignUpObject, { dispatch, rejectWithValue }) => {
    try {
      await userService.updateUser(user);
      dispatch(getUser());
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;
        errorResponse = { ...errorResponse, ...error.response?.data };
        console.log('[signup] er: ', error.response);
      }
      return rejectWithValue(errorResponse);
    }
  },
);
const getUser = createAsyncThunk('auth/get', async (_, { rejectWithValue }) => {
  try {
    const userDataResponse = await userService.getUser();
    console.log('[getUser] :', userDataResponse.data);
    localStorage.setItem('profile', JSON.stringify(userDataResponse.data));
    return { ...userDataResponse.data };
  } catch (error) {
    let errorResponse = { code: 500, message: 'Something went wrong!' };
    if (axios.isAxiosError(error)) {
      errorResponse.code = error.status || 500;
      errorResponse = { ...errorResponse, ...error.response?.data };
      console.log('[getUser] er: ', error.response);
    }
    return rejectWithValue(errorResponse);
  }
});
const signUp = createAsyncThunk(
  'auth/signup',
  async (user: IUserSignUpObject, { dispatch, rejectWithValue }) => {
    try {
      await authService.signUp(user);
      dispatch(
        login({
          idCode: user.idCode,
          password: user.password,
          rememberMe: true,
        }),
      );
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse = { ...errorResponse, ...error.response?.data };
        errorResponse.code = error.response?.status || 500;
        console.log('[signup] er(C): ', error.response);
        console.log(
          '[signup] er: ',
          errorResponse,
          ' - -***- -',
          error.response?.status,
        );
      }
      return rejectWithValue(errorResponse);
    }
  },
);

const login = createAsyncThunk(
  'auth/login',
  async (userCredentials: IUserLoginObject, { dispatch, rejectWithValue }) => {
    try {
      console.log('[login] req:', userCredentials);
      const response = await authService.login(userCredentials);
      const userData = response.data as IUserResponseObject;

      console.log('[login] res:', userData);

      localStorage.setItem(userLocalStorageKey, JSON.stringify(userData))

      axiosInstance.defaults.headers.common['Authorization'] = userData.token;

      dispatch(getUser());
      return {
        ...userData,
        isLoggedIn: true,
      };
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse = { ...errorResponse, ...error.response?.data };
        errorResponse.code = error.response?.status || 500;
        console.log('[login] er: ', errorResponse);
      }
      return rejectWithValue(errorResponse);
    }
  },
);

const checkAuthState = createAsyncThunk(
  'auth/checkState',
  async (_, { dispatch, getState }) => {
    try {
      const { user } = getState() as { user: IUserRedux };
      // console.log('[help] u: ', user);
      const userData = JSON.parse(localStorage.getItem(userLocalStorageKey) || '{}');
      // console.log('[help] d:', userData);
      if (!userData || !userData.token) {
        console.log(getState());
        user.token && dispatch(logout());
      } else {
        axiosInstance.defaults.headers.common['Authorization'] = userData.token;
        return { ...userData, isLoggedIn: true };
      }
    } catch (error) {
      console.log('[auth]', error);
    }
  },
);

const userAuthAction = {
  login,
  signUp,
  getUser,
  updateUser,
  checkAuthState,
};

export default userAuthAction;
