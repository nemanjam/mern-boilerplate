import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getFeature } from '../../store/actions/privateActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

const Feature = ({ getFeature, message, errors }) => {
  useEffect(() => {
    getFeature();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Feature page</h1>
        <p>{message}</p>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  message: state.private.message,
  errors: state.errors,
});

export default compose(requireAuth, connect(mapStateToProps, { getFeature }))(Feature);
