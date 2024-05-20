import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

interface UserProtectedRoutesContainerProps {
  fallbackComponent: JSX.Element;
  routes: RouteObject[];
}

const UserProtectedRoutesContainer: React.FC<
  UserProtectedRoutesContainerProps
> = ({ routes, fallbackComponent }) => {
  const router = createBrowserRouter(routes);

  return (
    <>
      <Suspense fallback={fallbackComponent}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default UserProtectedRoutesContainer;
