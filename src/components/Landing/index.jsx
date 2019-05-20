import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import { SignInForm } from "../SignIn";
import { SignUpForm } from "../SignUp";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "auto",
    backgroundImage:
      "url(" +
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-years-goals-and-resolution-written-on-notepad-royalty-free-image-1095003074-1549308443.jpg?crop=1xw:1xh;center,top&resize=768:*" +
      ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#C5C6C7",
    height: "100vh"
  },
  form_container: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 400,
    width: "100%",
    margin: "auto",
    paddingTop: theme.spacing.unit * 2
  },
  paper: {
    minWidth: 400,
    width: 800,
    height: "auto",
    textAlign: "center",
    margin: "auto",
    background: "white",
    color: "black",
    marginTop: "10px",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  list: { listStyleType: "none", color: "black" }
});

const Landing = props => {
  const [openSigIn, setOpenSigIn] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);
  const { classes } = props;

  //====
  const SigMeIn = () => (
    <Paper className={classes.paper} elevation={15}>
      {openSigIn ? (
        <Slide in={openSigIn}>
          <SignInForm />
        </Slide>
      ) : (
        <>
          <h1> Already a member...? let's sign In </h1>

          <Button variant="outlined" color="primary" onClick={handleActiveForm}>
            Sign Me In
          </Button>
        </>
      )}
    </Paper>
  );
  const SigMeUp = () => (
    <Paper className={classes.paper} elevation={15}>
      {openSignUp ? (
        <Slide in={openSignUp}>
          <SignUpForm />
        </Slide>
      ) : (
        <>
          <h1> Not Member yet...? let's sign you up </h1>
          <ul className={classes.list}>
            <li>
              <h3>Create a plan</h3>
            </li>
            <li>
              <h2>Log your workouts</h2>
            </li>
            <li>
              <h1>See and share your progress</h1>
            </li>
          </ul>
          <Button variant="outlined" color="primary" onClick={handleActiveForm}>
            Sign Me Up{" "}
          </Button>
        </>
      )}
    </Paper>
  );

  function handleActiveForm() {
    setOpenSigIn(openSigIn ? false : true);
    setOpenSignUp(openSignUp ? false : true);
  }

  return (
    <div className={classes.root}>
      <div className={classes.form_container}>
        <SigMeIn />
        <SigMeUp />
      </div>
    </div>
  );
};

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
