import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1140 + theme.spacing(3 * 2))]: {
      width: 1140,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paddingTop: '64px',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Navbar />
      <div className={classes.root}>{children}</div>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
