import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/Main";

const AuthRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          <MainLayout>{children}</MainLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
