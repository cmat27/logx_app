import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
//we'll use material UI for component styling
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";

//--- css
const styles = theme => ({
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    textAlign: "center",
    width: 400,
    margin: "auto",
    display: "flex-left"
  },
  paper: {
    background: "#D5D5D5",
    color: "white",
    height: "auto"
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "80%"
  },
  dense: {
    marginTop: 23
  },
  signInBtt: {
    marginTop: 10
  }
});
const bckg = {
  background: "#1F2833",
  color: "#C5C6C7",
  height: "100vh"
};
//--
const SignInPg = () => {
  return (
    <div style={bckg}>
      <SignInForm />
    </div>
  );
};
//initial state for sign in component
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
// create the signIn form base  CLass
class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  //signIn functionality/behavior
  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    // given that there're multiple fileds we'll chacke by name
    // which field is been updated and based on it we'll update the state
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // we'll get the conastant to render
    const { email, password, error } = this.state;
    // we'll run a validation to ensure both field have values
    const isInvalid = password === "" || email === "";

    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <Paper className={classes.paper} elevation={3}>
          <TextField
            label="E-mail"
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            variant="filled"
          />
          <TextField
            label="Password"
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            variant="filled"
          />
          <div>
            <Button
              className={classes.signInBtt}
              disabled={isInvalid}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign In
            </Button>
          </div>

          {error && <p>{error.message}</p>}

          <SignUpLink />
          <PasswordForgetLink />
        </Paper>
      </form>
    );
  }
}

SignInFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};
const SignInForm = compose(
  withRouter,
  withFirebase
)(withStyles(styles)(SignInFormBase));

export default SignInPg;
export { SignInForm };
