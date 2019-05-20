import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPg from "../Landing";
import SignUpPg from "../SignUp";
import SignInPg from "../SignIn";
import PasswordForgetPg from "../PasswordForget";
import HomePg from "../Home";
import AccountPg from "../Account";
import AdminPg from "../Admin";
import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";

//given that the local state will be handle here
// we have App as a class and make it accessible by the
// rest of the application

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPg} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPg} />
      <Route path={ROUTES.SIGN_IN} component={SignInPg} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPg} />
      <Route path={ROUTES.HOME} component={HomePg} />
      <Route path={ROUTES.ACCOUNT} component={AccountPg} />
      <Route path={ROUTES.ADMIN} component={AdminPg} />
    </div>
  </Router>
);

export default withAuthentication(App);
