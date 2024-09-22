import { createSlice } from '@reduxjs/toolkit';
import { IUserRedux } from '../types/user';
import userAuthAction from './userAuthAction';
import { userLocalStorageKey } from '../constants';

export const initialState: IUserRedux = {
  isLoggedIn: false,
  _id: '',
  idCode: '',
  token: '',
  status: 'idle',
  response: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetResponse: (state) => {
      state.response = null;
    },
    logout: () => {
      localStorage.removeItem(userLocalStorageKey);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthAction.signUp.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          isLoggedIn: false,
          response: null,
        };
      })
      .addCase(userAuthAction.signUp.fulfilled, (state, action) => {
        console.log('[userSlice] <signup.ful>: ', action.payload);
        return {
          ...state,
          // ...action.payload,
          status: 'succeeded',
          response: null,
        };
      })
      .addCase(userAuthAction.signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.response = action.payload as {
          code: number;
          message: string;
        } | null;
      })
      .addCase(userAuthAction.updateUser.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          response: null,
        };
      })
      .addCase(userAuthAction.updateUser.fulfilled, (state, action) => {
        console.log('[userSlice] <updateUser.ful>: ', action.payload);
        return {
          ...state,
          // ...action.payload,
          status: 'succeeded',
          response: null,
        };
      })
      .addCase(userAuthAction.updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.response = action.payload as {
          code: number;
          message: string;
        } | null;
      })
      .addCase(userAuthAction.getUser.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          response: null,
        };
      })
      .addCase(userAuthAction.getUser.fulfilled, (state, action) => {
        console.log('[userSlice] <getUser.ful>: ', action.payload);
        return {
          ...state,
          // ...action.payload,
          status: 'succeeded',
          response: { code: 200, message: 'ok' },
        };
      })
      .addCase(userAuthAction.getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.response = action.payload as {
          code: number;
          message: string;
        } | null;
      })
      .addCase(userAuthAction.login.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          isLoggedIn: false,
          response: null,
        };
      })
      .addCase(userAuthAction.login.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded',
          isLoggedIn: true,
          response: null,
        };
      })
      .addCase(userAuthAction.login.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoggedIn = false;
        state.response = action.payload as {
          code: number;
          message: string;
        } | null;
      })
      .addCase(userAuthAction.checkAuthState.pending, (state) => {
        return { ...state, status: 'loading', response: null };
      })
      .addCase(userAuthAction.checkAuthState.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'succeeded',
          response: null,
        };
      })
  },
});

export const { logout, resetResponse } = userSlice.actions;
export default userSlice.reducer;
