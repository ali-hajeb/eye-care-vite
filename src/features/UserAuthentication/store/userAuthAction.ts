import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { userLocalStorageKey } from '../constants';
import authService from '../services/authService';
import { IDecodedToken } from '../types/token';
import {
  IUserLoginObject,
  IUserRedux,
  IUserResponseObject,
  IUserSignUpObject,
} from '../types/user';
import { logout } from './userSlice';

const signUp = createAsyncThunk(
  'auth/signup',
  async (user: IUserSignUpObject, { dispatch, rejectWithValue }) => {
    try {
      await authService.signUp(user);
      dispatch(
        login({
          email: user.email,
          password: user.password,
          rememberMe: false,
        }),
      );
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;
        errorResponse = { ...errorResponse, ...error.response?.data };
      }
      return rejectWithValue(errorResponse);
    }
  },
);

const login = createAsyncThunk(
  'auth/login',
  async (userCredentials: IUserLoginObject, { rejectWithValue }) => {
    try {
      const response = await authService.login(userCredentials);
      const userData = response.data as IUserResponseObject;
      const { username, id } = jwtDecode(userData.token) as IDecodedToken;

      localStorage.setItem(userLocalStorageKey, JSON.stringify(userData));

      return {
        ...userData,
        isLoggedIn: true,
        username,
        id,
      };
    } catch (error) {
      let errorResponse = { code: 500, message: 'Something went wrong!' };
      if (axios.isAxiosError(error)) {
        errorResponse.code = error.status || 500;

        errorResponse = { ...errorResponse, ...error.response?.data };
      }
      return rejectWithValue(errorResponse);
    }
  },
);

const checkAuthState = createAsyncThunk(
  'auth/checkState',
  async (_, { dispatch, getState }) => {
    const { user } = getState() as { user: IUserRedux };
    const userData = JSON.parse(
      localStorage.getItem(userLocalStorageKey) || '{}',
    ) as IUserRedux;

    if (!userData || !userData.token) {
      console.log(getState());
      user.token && dispatch(logout());
    } else {
      const { username, id } = jwtDecode(userData.token) as IDecodedToken;
      return { ...userData, isLoggedIn: true, username, id };
    }
  },
);

const userAuthAction = {
  login,
  signUp,
  checkAuthState,
};

export default userAuthAction;
