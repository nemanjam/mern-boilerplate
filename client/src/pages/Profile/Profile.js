import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { getProfile, editUser, deleteUser } from '../../store/actions/userActions';
import { loadMe } from '../../store/actions/authActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import { profileSchema } from './validation';

import './styles.css';

//// nema password za oauth usere ni na klijentu ni serveru
// validacija na serveru i error handilng na clientu
// css i html
//// delete user i logika da ne brise seedovane
//// admin ruta i hoc
// error handling login register posto je zajednicki loading i error
//// mongo atlas i heroku deploy package json i promenljive env i config
//// avatar staza u bazu samo fajl
//// gitignore za placeholder avatar
//// delete profile ruta

// hendlovanje staza za slike, default avatar za izbrisane sa heroku
// readme
//// posle edit user treba redirect na novi username url

// fore
// za facebook more https apsolutni callback url
// FACEBOOK_CALLBACK_URL=https://mern-boilerplate-demo.herokuapp.com/auth/facebook/callback
// da bi prihvatio fb domen mora dole da se poklapa sa siteurl

const Profile = ({
  getProfile,
  user: { profile, isLoading, error },
  auth: { me },
  editUser,
  deleteUser,
  loadMe,
  history,
  match,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const retryCount = useRef(0);
  const matchUsername = match.params.username;

  useEffect(() => {
    getProfile(matchUsername, history);
  }, [matchUsername]);

  // if changed his own username reload me, done in userActions

  const onChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
  };

  const handleClickEdit = () => {
    retryCount.current = 0;
    setIsEdit((oldIsEdit) => !oldIsEdit);
    setImage(null);
    setAvatar(null);
    formik.setFieldValue('id', profile.id);
    formik.setFieldValue('name', profile.name);
    formik.setFieldValue('username', profile.username);
  };

  const handleDeleteUser = (id, history) => {
    deleteUser(id, history);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      name: '',
      username: '',
      password: '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('name', values.name);
      formData.append('username', values.username);
      if (profile.provider === 'email') {
        formData.append('password', values.password);
      }
      editUser(values.id, formData, history);
      //setIsEdit(false);
    },
  });

  return (
    <Layout>
      <div className="profile">
        <h1>Profile page</h1>
        <p>
          This is the profile page. User can edit his own profile and Admin can edit any user's
          profile. Only authenticated users can see this page.
        </p>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="profile-info">
            <img src={image ? image : profile.avatar} className="avatar" />
            <div className="info-container">
              <div>
                <span className="label">Provider: </span>
                <span className="info">{profile.provider}</span>
              </div>
              <div>
                <span className="label">Role: </span>
                <span className="info">{profile.role}</span>
              </div>
              <div>
                <span className="label">Name: </span>
                <span className="info">{profile.name}</span>
              </div>
              <div>
                <span className="label">Username: </span>
                <span className="info">{profile.username}</span>
              </div>
              <div>
                <span className="label">Email: </span>
                <span className="info">{profile.email}</span>
              </div>
              <div>
                <span className="label">Joined: </span>
                <span className="info">
                  {moment(profile.createdAt).format('dddd, MMMM Do YYYY, H:mm:ss')}
                </span>
              </div>
              <div>
                <button
                  className="btn"
                  type="button"
                  onClick={handleClickEdit}
                  disabled={!(me?.username === profile.username || me?.role === 'ADMIN')}
                >
                  {isEdit ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {isEdit && (
          <div className="form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label>Avatar:</label>
                <input name="image" type="file" onChange={onChange} />
                {image && (
                  <button
                    className="btn"
                    onClick={() => {
                      setImage(null);
                      setAvatar(null);
                    }}
                    type="button"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <input name="id" type="hidden" value={formik.values.id} />
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
                {formik.touched.name && formik.errors.name ? (
                  <p className="error">{formik.errors.name}</p>
                ) : null}
              </div>
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
                {formik.touched.username && formik.errors.username ? (
                  <p className="error">{formik.errors.username}</p>
                ) : null}
              </div>
              {profile.provider === 'email' && (
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
                  {formik.touched.password && formik.errors.password ? (
                    <p className="error">{formik.errors.password}</p>
                  ) : null}
                </div>
              )}
              <button type="submit" className="btn">
                Save
              </button>
              <button
                onClick={() => handleDeleteUser(profile.id, history)}
                type="button"
                className="btn"
              >
                Delete profile
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default compose(
  requireAuth,
  withRouter,
  connect(mapStateToProps, { getProfile, editUser, deleteUser, loadMe }),
)(Profile);
