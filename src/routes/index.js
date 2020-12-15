import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import DefaultLayout from "../layouts/Default";
import Home from "../views/Home";
import Signup from "../views/Signup";
import SignupComplete from "../views/SignupComplete";
import Signin from "../views/Signin";
import ForgotPassword from "../views/ForgotPassword";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
import NotFound from "../views/NotFound";
import Search from "../views/Search";
import PostView from "../views/Post";

const Routes = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <AuthRoute exact path="/">
            <Home />
          </AuthRoute>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/signup-complete" component={SignupComplete} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <AuthRoute path="/profile/:profileId">
            <Profile />
          </AuthRoute>
          <AuthRoute path="/posts/:postId">
            <PostView />
          </AuthRoute>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/search">
            <Search />
          </AuthRoute>
          <Route component={NotFound} />
        </Switch>
      </DefaultLayout>
    </Router>
  );
};

export default Routes;
