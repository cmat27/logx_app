import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p> This page will only be accesible by user that are signed in </p>
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  /* withEmailVerification, */
  withAuthorization(condition)
)(Home);
