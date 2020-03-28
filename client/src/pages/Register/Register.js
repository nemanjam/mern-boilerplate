import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { registerUserWithEmail } from '../../store/actions/authActions';
import './styles.css';

const Register = ({ auth, history, registerUserWithEmail }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    registerUserWithEmail(
      { name, username, email, password },
      () => {
        history.push('/login');
      },
      () => {},
    );
  };

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Register page</h1>
        <p>
          back to{' '}
          <Link className="bold" to="/">
            Home page
          </Link>
        </p>
        <form onSubmit={onSubmit} noValidate>
          <h2>Create new account</h2>
          <div>
            <input
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              className=""
              type="text"
            />
            <input
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              className=""
              type="text"
            />
            <input
              placeholder="Email address"
              name="email"
              value={email}
              onChange={onChange}
              className=""
              type="text"
            />
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              className=""
              type="password"
            />
          </div>
          {auth.error && <p className="error">{auth.error}</p>}
          <div>
            {auth.isLoading ? (
              <p>Loading...</p>
            ) : (
              <button className="btn submit" type="submit">
                Sign up now
              </button>
            )}
          </div>
          <div>
            Have an account?{' '}
            <Link className="bold" to="/login">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
