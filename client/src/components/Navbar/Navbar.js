import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser, loadMe } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, loadMe, history }) => {
  const onLogOut = event => {
    event.preventDefault();

    logOutUser(() => {
      history.push('/');
    });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">MERN Boilerplate</h2>
      <ul className="nav-links flex-1">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/feature">Feature</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="flex-1" />
            <li className="nav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </li>
          </>
        ) : (
          <>
            <li className="flex-1" />
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser, loadMe }))(Navbar);
