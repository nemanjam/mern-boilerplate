import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getProfile } from '../../store/actions/privateActions';
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

const Profile = ({ getProfile, profile, errors }) => {
  useEffect(() => {
    getProfile();
  }, []);

  const classes = useStyles();

  return (
    <Layout>
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            Profile
          </Typography>
          <Typography component="p">Provider: {profile.provider}</Typography>
          <Typography component="p">Display name: {profile.displayName}</Typography>
          <Typography component="p">Email: {profile.email}</Typography>
        </Paper>
      </div>
    </Layout>
  );
};

Profile.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.private.profile,
  errors: state.errors,
});

export default compose(requireAuth, connect(mapStateToProps, { getProfile }))(Profile);
