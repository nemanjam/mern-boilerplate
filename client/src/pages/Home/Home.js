import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';

const Home = ({ auth }) => {
  return (
    <Layout>
      <h1>Home page</h1>
      {!auth.isAuthenticated ? (
        <p>
          Welcome! <Link to="/login">Log in</Link> or <Link to="/register">Register</Link>
        </p>
      ) : (
        <p>Welcome {auth.me.displayName}!</p>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(connect(mapStateToProps))(Home);
