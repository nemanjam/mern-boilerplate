import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import { getProfile } from '../../store/actions/privateActions';
import Layout from '../../layout/Layout';
import requireAuth from '../../hoc/requireAuth';
import { profileSchema } from './validation';

import './styles.css';

const Profile = ({ getProfile, profile, errors }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const onChange = event => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      username: profile.username,
      password: '',
    },
    validationSchema: profileSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <Layout>
      <div className="profile">
        <h1>Profile page</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <img
              src={image ? image : profile.avatar || 'https://i.pravatar.cc/250'}
              className="img"
            />
          </div>

          {isEdit && (
            <div>
              <input name="image" type="file" onChange={onChange} />
              {image && (
                <button className="btn" onClick={() => setImage(null)} type="button">
                  Remove Image
                </button>
              )}
            </div>
          )}

          <p>Provider: {profile.provider}</p>
          {!isEdit ? (
            <p>Name: {profile.name}</p>
          ) : (
            <div className="input-div">
              <label>Name:</label>
              <input
                placeholder="Name"
                name="name"
                className=""
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
          )}
          {!isEdit ? (
            <p>Username: {profile.username}</p>
          ) : (
            <div className="input-div">
              <label>Username:</label>
              <input
                placeholder="Username"
                name="username"
                className=""
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
          )}
          <p>Email: {profile.email}</p>
          {isEdit && (
            <div className="input-div">
              <label>Password:</label>
              <input
                placeholder="Password"
                name="password"
                className=""
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
          )}
          <button
            className="btn"
            type="button"
            onClick={() => {
              setIsEdit(oldIsEdit => !oldIsEdit);
              setImage(null);
            }}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
          {isEdit ? (
            <button type="submit" className="btn">
              Save
            </button>
          ) : (
            <button className="btn" type="button">
              Delete
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  profile: state.private.profile,
  errors: state.errors,
});

export default compose(requireAuth, connect(mapStateToProps, { getProfile }))(Profile);
