import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface RequiredAuthProps extends React.PropsWithChildren {
  isLoggedIn: boolean;
}

const RequiredAuth: React.FC<RequiredAuthProps> = ({
  isLoggedIn,
  children,
}) => {
  const location = useLocation();
  
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" replace />
  );
};

export default RequiredAuth;
