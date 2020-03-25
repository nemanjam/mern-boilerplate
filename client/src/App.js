import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/private/Profile';
import Feature from './pages/private/Feature';

import { logInUserWithOauth, loadMe } from './store/actions/authActions';

const App = ({ logInUserWithOauth, auth, loadMe }) => {
  useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';

    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [auth.isAuthenticated, auth.token, loadMe]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/feature" component={Feature} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(connect(mapStateToProps, { logInUserWithOauth, loadMe }))(App);
