import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { getUsers } from '../../store/actions/userActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

import './styles.css';

const Feature = ({ getUsers, user: { users } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div className="users">
        <h1>Users page</h1>
        {users.map((user, index) => {
          return (
            <div key={index} className="profile">
              <img src={user.avatar} className="avatar" />
              <div className="info-container">
                <div>
                  <span className="label">Provider: </span>
                  <span className="info">{user.provider}</span>
                </div>
                <div>
                  <span className="label">Name: </span>
                  <span className="info">{user.name}</span>
                </div>
                <div>
                  <span className="label">Username: </span>
                  <span className="info">{user.username}</span>
                </div>
                <div>
                  <span className="label">Email: </span>
                  <span className="info">{user.email}</span>
                </div>
                <div>
                  <span className="label">Joined: </span>
                  <span className="info">
                    {moment(user.createdAt).format('dddd, MMMM Do YYYY, H:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(requireAuth, connect(mapStateToProps, { getUsers }))(Feature);
