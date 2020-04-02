import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import Messages from '../../components/Messages/Messages';
import MessageForm from '../../components/MessageForm/MessageForm';

import './styles.css';

const Home = ({ auth }) => {
  return (
    <Layout>
      <div className="home">
        <h1>Home page</h1>
        {!auth.isAuthenticated ? (
          <p>
            Welcome!{' '}
            <Link className="bold" to="/login">
              Log in
            </Link>{' '}
            or{' '}
            <Link className="bold" to="/register">
              Register
            </Link>
          </p>
        ) : (
          <>
            <p>Welcome {auth.me.name}!</p>
            <MessageForm />
          </>
        )}
        <Messages />
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(connect(mapStateToProps))(Home);
