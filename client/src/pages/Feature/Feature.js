import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getUsers } from '../../store/actions/userActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';

const Feature = ({ getUsers, user: { users } }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Users page</h1>
        {users.map((user, index) => {
          return (
            <div key={index}>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.provider}</p>
              <img src={user.avatar} />
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
