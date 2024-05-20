import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import UserProtectedRoutesProvider from "./features/UserAuthentication";
import routes from "./routes";
import NotFoundPage from "./pages/404";
import './App.module.css';
import MainPanelContainer from "./containers/MainPanel";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <UserProtectedRoutesProvider
        fallbackComponent={<strong>Loading...</strong>}
        protectedRoutes={routes.protectedRoutes}
        authenticationRoutes={routes.authenticationRoutes}
        userPanelComponent={< MainPanelContainer />}
        notFoundPage={<NotFoundPage />}
      />
    </MantineProvider>
  );
}
