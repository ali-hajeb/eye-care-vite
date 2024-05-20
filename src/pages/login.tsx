import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import LoginPanel from '../containers/LoginPanel';

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const { state } = useLocation();

  const token = useAppSelector((state) => state.user.token);

  const redirectPath = state?.from !== '/logout' ? state?.from || '/' : '/';
  const redirect = token ? <Navigate to={redirectPath} replace /> : null;

  return redirect || <LoginPanel />;
};

export default LoginPage;
