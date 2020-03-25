import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getFeature } from '../../store/actions/privateActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: '15px',
  },
}));

const Feature = ({ getFeature, message, errors }) => {
  useEffect(() => {
    getFeature();
  }, []);

  const classes = useStyles();

  return (
    <Layout>
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {message}
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </div>
    </Layout>
  );
};

Feature.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  message: state.private.message,
  errors: state.errors,
});

export default compose(requireAuth, connect(mapStateToProps, { getFeature }))(Feature);
