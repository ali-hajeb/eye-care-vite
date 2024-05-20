import React, { useCallback, useEffect, useMemo } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import RequiredAuth from './containers/RequiredAuth';
import UserPanel from './containers/UserPanel';
import UserProtectedRoutesContainer from './containers/UserProtectedRoutesContainer';
import userAuthAction from './store/userAuthAction';

export interface AppProps {
  protectedRoutes: RouteObject[];
  fallbackComponent: JSX.Element;
  authenticationRoutes: RouteObject[];
  notFoundPage: React.ReactNode;
  userPanelComponent?: React.ReactNode;
  context?: object;
}

const UserProtectedRoutesProvider: React.FunctionComponent<AppProps> = ({
  protectedRoutes,
  fallbackComponent,
  authenticationRoutes,
  notFoundPage,
  userPanelComponent,
  context,
}) => {
  const dispatch = useAppDispatch();
  const checkAuthStateHandler = useCallback(
    () => dispatch(userAuthAction.checkAuthState()),
    [dispatch],
  );

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    checkAuthStateHandler();
  }, [checkAuthStateHandler]);

  const finalRoutes: RouteObject[] = useMemo(
    () => [
      ...authenticationRoutes,
      {
        path: '/',
        element: (
          <RequiredAuth isLoggedIn={isLoggedIn}>
            {userPanelComponent || <UserPanel context={context} />}
          </RequiredAuth>
        ),
        children: protectedRoutes,
      },
      { path: '/404', element: notFoundPage },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
    [
      context,
      protectedRoutes,
      isLoggedIn,
      userPanelComponent,
      authenticationRoutes,
      notFoundPage,
    ],
  );

  return (
    <UserProtectedRoutesContainer
      fallbackComponent={fallbackComponent}
      routes={finalRoutes}
    />
  );
};

export default UserProtectedRoutesProvider;
