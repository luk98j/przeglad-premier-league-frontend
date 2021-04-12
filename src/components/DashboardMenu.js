import React, { useState, useEffect, Profiler } from "react";
import {Link } from "react-router-dom";
import "../App.css";
import AuthService from "../services/auth.service";
import SwitchAndRoute from "../static/SwitchAndRoute";
import menuHeaderForAllUsers from "../static/MenuTabs";
import menuHeaderForAuthUsers from "../static/MenuTabsForAuthUsers";
import { AppBar, Toolbar, Typography, MenuItem, Menu, Button, IconButton } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const DashboardMenu = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [openMenu, setOpen] = useState(false);
  
  useEffect(() => {
    console.log(currentUser)
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMenu = () => {
    setOpen(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to={"/"}>
              Przegląd Premier League
          </Link>
        </Typography>
          {currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
                </MenuItem>
                
              </Menu>
              </div>
          ):(
          <Button color="inherit">
            <Link to={"/login"} className="nav-link">
                Login
              </Link>
          </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="container mt-5">
        <SwitchAndRoute/>
      </div>
    </div>
  );
};

export default DashboardMenu