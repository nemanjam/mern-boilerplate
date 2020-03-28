import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getProfile } from '../../store/actions/privateActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

const Profile = ({ getProfile, profile, errors }) => {
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <h1>Profile page</h1>
      <p>Provider: {profile.provider}</p>
      <p>Name: {profile.name}</p>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
    </Layout>
  );
};

const mapStateToProps = state => ({
  profile: state.private.profile,
  errors: state.errors,
});

export default compose(requireAuth, connect(mapStateToProps, { getProfile }))(Profile);
