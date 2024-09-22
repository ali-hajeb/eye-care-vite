import React from 'react';
import { Outlet } from 'react-router-dom';

export interface UserPanelProps {
  context?: {
    [key: string]: unknown;
  };
}

const UserPanel: React.FunctionComponent<UserPanelProps> = ({ context }) => {
  return <Outlet context={context} />;
};

export default UserPanel;
