import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getUsers } from '../../store/actions/usersActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';

import './styles.css';

const Users = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div className="users">
        <h1>Users page</h1>
        <p>
          This is the Users page. Here are listed all of the users of the app. Click the avatar or
          the username link to go to user's profile. Only authenticated users can see this page.
        </p>
        <div className="list">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <div key={index} className="profile">
                    <Link to={`/${user.username}`}>
                      <img src={user.avatar} className="avatar" />
                    </Link>
                    <div className="info-container">
                      <div>
                        <span className="label">Provider: </span>
                        <span className="info">{user.provider}</span>
                      </div>
                      <div>
                        <span className="label">Role: </span>
                        <span className="info">{user.role}</span>
                      </div>
                      <div>
                        <span className="label">Name: </span>
                        <span className="info">{user.name}</span>
                      </div>
                      <div>
                        <span className="label">Username: </span>
                        <Link to={`/${user.username}`} className="info bold profile-link">
                          {user.username}
                        </Link>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default compose(requireAuth, connect(mapStateToProps, { getUsers }))(Users);
