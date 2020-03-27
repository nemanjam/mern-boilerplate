import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUserWithEmail } from '../../store/actions/authActions';
import './styles.css';

const Login = ({ errors, auth, history, loginUserWithEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    loginUserWithEmail(
      { email, password },
      () => {
        history.push('/');
      },
      () => {},
    );
  };

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const isLoading = false;

  return (
    <div className="login">
      <div className="container">
        <h1>Log in page</h1>
        <p>
          back to <Link to="/">Home page</Link>
        </p>
        <form onSubmit={onSubmit}>
          <h2>Log in with social media</h2>
          <a className="fb btn" href="https://localhost:5000/auth/facebook">
            <i class="fa fa-facebook fa-fw" /> Login with Facebook
          </a>
          <a className="google btn" href="https://localhost:5000/auth/google">
            <i class="fa fa-google fa-fw" />
            Login with Google
          </a>
          <h2>Login with email address</h2>
          <div>
            <input
              placeholder="Email address"
              name="email"
              value={email}
              onChange={onChange}
              className="text"
              type="text"
            />
            <input
              placeholder="Password"
              name="password"
              value={password}
              type="password"
              onChange={onChange}
              className="text"
            />
          </div>
          {errors && typeof errors !== 'object' && <p>{errors.toString()}</p>}
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button className="btn" disabled={false} type="submit">
                Log in now
              </button>
            )}
          </div>
          <div>
            Don't have an account?{' '}
            <Link className="" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithEmail }))(Login);
