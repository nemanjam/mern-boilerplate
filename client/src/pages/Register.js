import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';

import { registerUserWithEmail } from '../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  grid: {
    height: '100%',
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
  },
  bio: {
    color: theme.palette.common.white,
  },
  contentWrapper: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(1),
  },
  fields: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2),
    },
  },
  policy: {
    display: 'flex',
    alignItems: 'center',
  },
  policyCheckbox: {
    marginLeft: '-10px',
  },
  policyText: {
    display: 'inline',
    color: theme.palette.text.secondary,
  },
  policyUrl: {
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main,
    },
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signUpButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  signIn: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  signInUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  fieldError: {
    color: 'red',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  submitError: {
    color: 'red',
    alignText: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be 2 characters at minimum.')
    .max(10, 'Name must be 10 characters at maximum.')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be 2 characters at minimum.')
    .max(10, 'Password must be 10 characters at maximum.')
    .required('Required'),
});

const Register = ({ errors, auth, history, registerUserWithEmail }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    registerUserWithEmail(
      { fullName, email, password },
      () => {
        history.push('/login');
      },
      () => {},
    );
  };

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'fullName') setFullName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center">
        <Grid className={classes.content} item xs={6}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton className={classes.backButton} component={Link} to="/">
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form onSubmit={onSubmit} className={classes.form} noValidate>
                <Typography className={classes.title} variant="h4">
                  Create new account
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={fullName}
                    onChange={onChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    label="Email address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className={classes.textField}
                    variant="outlined"
                    type="password"
                  />
                </div>
                {errors && typeof errors !== 'object' && (
                  <Typography className={classes.submitError} variant="body2">
                    {errors.toString()}
                  </Typography>
                )}
                {auth.isLoading ? (
                  <CircularProgress className={classes.progress} />
                ) : (
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Sign up now
                  </Button>
                )}
                <Typography className={classes.signIn} variant="body1">
                  Have an account?{' '}
                  <Link className={classes.signInUrl} to="/login">
                    Log In
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

// Register.propTypes = {
//   className: PropTypes.string,
//   classes: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
