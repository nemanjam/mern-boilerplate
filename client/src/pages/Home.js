import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Layout from '../layout/Layout';

const useStyles = makeStyles(theme => ({}));

const Home = ({ auth }) => {
  return (
    <Layout>
      {!auth.isAuthenticated ? (
        <h1>Welcome! Log in or register!</h1>
      ) : (
        <h1>Welcome {auth.me.displayName}!</h1>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(connect(mapStateToProps))(Home);
