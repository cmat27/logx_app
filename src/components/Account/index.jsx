import React, { useState, useEffect } from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import UserInfo from "../UserInfo";
import AddIcon from "@material-ui/icons/Add";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";
import Button from "@material-ui/core/Button";

import { compose } from "recompose";

const AccountPg = props => {
  const [editPassword, setEditPassword] = useState(false);
  const [editInfo, setEditInfo] = useState(true);

  //setAuthUser({authUser.email})

  const PasswordForms = () => (
    <>
      <AuthUserContext.Consumer>
        {authUser => <h1>Account: {authUser ? authUser.username : null}</h1>}
      </AuthUserContext.Consumer>
      <PasswordChangeForm /> <PasswordForgetForm />{" "}
    </>
  );

  const handleSelection = event => {
    // eslint-disable-next-line
    switch (event.currentTarget.value) {
      case "editPassword": {
        setEditInfo(false);
        setEditPassword(true);
        break;
      }

      case "editInfo":
        setEditPassword(false);
        setEditInfo(true);

        break;
      default:
        setEditInfo(true);
    }

    event.preventDefault();
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          value={"editPassword"}
          onClick={handleSelection}
        >
          Edit Password
        </Button>
        <Button
          variant="contained"
          color="primary"
          value="editInfo"
          onClick={handleSelection}
        >
          Edit Profile
        </Button>
      </div>

      {editInfo && !editPassword ? <UserInfo /> : <PasswordForms />}

      <hr />
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPg);
