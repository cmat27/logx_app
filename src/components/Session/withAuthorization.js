import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return ((
        /*  <AuthUserContext.Consumer> {authUser => condition(authUser) ? */
        <Component {...this.props} /> /* : null */
        /* }
                </AuthUserContext.Consumer > */
      ) /*: null */);
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;

/*
this with authorization will be used to dynamically control/flag certain pages from
displaying to user that don't have permission to access
when the user is not logged in will have limit access and viceversa
*/
