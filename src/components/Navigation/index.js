import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// Here we'll use auth user constant
// to condition the type of nav we display to the user

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

const Navigation = props => {
  const [anchorEl, setAchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // the following will get updated when ever the cnachoreEl or mobile anchoreEl changes
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { classes } = props;
  function handleProfileMenuOpen(event) {
    setAchorEl(event.currentTarget);
  }

  function handleMenuClose(e) {
    setAchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose(e) {
    setMobileMoreAnchorEl(null);
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClick={handleMenuClose}
      onClose={handleMenuClose}
    >
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClick={handleMobileMenuClose}
      onClose={handleMobileMenuClose}
    >
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Workout Logs
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography
              className={classes.username}
              variant="h6"
              color="inherit"
              noWrap
            >
              <AuthUserContext.Consumer>
                {authUser => <span>{authUser ? authUser.username : null}</span>}
              </AuthUserContext.Consumer>
            </Typography>
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              fontSize="large"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
};

const NavigationAuth = () => (
  <React.Fragment>
    <MenuItem>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </MenuItem>
    <MenuItem>
      <Link to={ROUTES.HOME}>Home</Link>
    </MenuItem>
    <MenuItem>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </MenuItem>
    <MenuItem>
      {" "}
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </MenuItem>
    <MenuItem>
      <SignOutButton />
    </MenuItem>
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <React.Fragment>
    <MenuItem>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </MenuItem>

    <MenuItem>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </MenuItem>
  </React.Fragment>
);

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
