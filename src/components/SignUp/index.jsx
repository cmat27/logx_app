import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";

const styles = theme => ({
  form: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    textAlign: "center",
    width: 400,
    margin: "auto"
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
  },
  temp: {
    background: "red"
  },
  button: {
    margin: theme.spacing.unit,
    background: "#03DAC6",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  buttonDisabled: {
    margin: theme.spacing.unit,
    background: "#E57373",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  error: {
    background: "red",
    color: "white",
    padding: "5px",
    marginTop: 30
  }
});

const bckg = {
  background: "#1F2833",
  color: "#C5C6C7",
  height: "auto"
};

const SignUpPg = () => (
  <div style={bckg}>
    <SignUpForm />
  </div>
);

//initial state const
const INITIAL_STATE = {
  username: "",
  email: "",
  password_1: "",
  password_2: "",
  error: ""
};
//form
class SignUpFormBase extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password_1 } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(username, email, password_1)
      .then(authUser => {
        // create a user in you firebase DB realtime
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email });
      })
      .then(() => {
        //this will make sure to sedn the verification email to user
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        // this section will only change the local state of the process
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN); // change to signIn
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { username, email, password_1, password_2, error } = this.state;
    const isInValid =
      password_1 !== password_2 ||
      password_1 === "" ||
      password_2 === "" ||
      email === "" ||
      username === "";
    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <Paper className={classes.paper}>
          <TextField
            label="User Name"
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            variant="filled"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <TextField
            label="Email "
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            variant="filled"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="E-mail"
          />
          <TextField
            label="Password"
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            variant="filled"
            name="password_1"
            value={password_1}
            onChange={this.onChange}
            type="text"
            placeholder="Password"
          />
          <TextField
            label="Cornfirm Password"
            className={classNames(classes.input, classes.dense)}
            margin="dense"
            variant="filled"
            name="password_2"
            value={password_2}
            onChange={this.onChange}
            type="text"
            placeholder="Confirm Password"
          />
          <Button
            disabled={isInValid}
            className={isInValid ? classes.buttonDisabled : classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.onSubmit}
          >
            Sign me Up
          </Button>
          {error && <p className={classes.error}>{error.message}</p>}
        </Paper>
      </form>
    );
  }
}
const signUpLinkStyle = {
  color: "black",
  marginTop: 30
};

const SignUpLink = () => (
  <p style={signUpLinkStyle}>
    Don't Have an Account Yet..?? <Link to={ROUTES.SIGN_UP}>Sign up </Link>
  </p>
);

SignUpFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const SignUpForm = compose(
  withRouter,
  withFirebase
)(withStyles(styles)(SignUpFormBase));

export default SignUpPg;

export { SignUpForm, SignUpLink };
