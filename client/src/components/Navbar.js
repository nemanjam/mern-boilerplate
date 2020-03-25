import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { logOutUser, loadMe } from '../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

const Navbar = ({ auth, logOutUser, loadMe, history }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
    logOutUser(() => {
      history.push('/');
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap color="inherit" style={{ marginRight: '20px' }}>
            Mern
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {auth.isAuthenticated && (
            <Button color="inherit" component={Link} to="/feature">
              Feature
            </Button>
          )}
          <section className={classes.toolbarButtons}>
            {auth.isAuthenticated ? (
              <div>
                <IconButton
                  aria-owns={Boolean(anchorEl) ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile">
                    <IconButton color="inherit">
                      <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                  </MenuItem>
                  <MenuItem onClick={onLogOut}>
                    <IconButton color="inherit">
                      <ExitToApp />
                    </IconButton>
                    <p>Log out</p>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button className={classes.noWrap} color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser, loadMe }))(Navbar);
