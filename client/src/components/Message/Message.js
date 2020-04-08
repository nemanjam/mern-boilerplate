import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';

import { deleteMessage, editMessage, clearMessageError } from '../../store/actions/messageActions';
import { messageFormSchema } from './validation';

import './styles.css';

const Message = ({ message, auth, deleteMessage, editMessage, clearMessageError }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (!isEdit) {
      deleteMessage(id);
    }
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    formik.setFieldValue('text', message.text);
    setIsEdit((oldIsEdit) => !oldIsEdit);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: '',
      id: message.id,
    },
    validationSchema: messageFormSchema,
    onSubmit: (values, { resetForm }) => {
      editMessage(values.id, { text: values.text });
      setIsEdit(false);
      // resetForm();
    },
  });

  // dont reset form if there is an error
  useEffect(() => {
    if (!message.error && !message.isLoading) formik.resetForm();
  }, [message.error, message.isLoading]);

  // keep edit open if there is an error
  useEffect(() => {
    if (message.error) setIsEdit(true);
  }, [message.error]);

  return (
    <div className={message.isLoading ? 'message loader' : 'message'}>
      <div className="message-header">
        <Link to={`/${message.user.username}`}>
          <img src={message.user.avatar} className="avatar" />
        </Link>
        <div>
          <Link to={`/${message.user.username}`} className="name">
            {message.user.name}
          </Link>
          <span className="username">@{message.user.username}</span>
          <span className="time text-light">{moment(message.createdAt).fromNow()}</span>
          {!moment(message.createdAt).isSame(message.updatedAt, 'minute') && (
            <span className="time text-light">{`Edited: ${moment(
              message.updatedAt,
            ).fromNow()}`}</span>
          )}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <>
            <textarea
              name="text"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              disabled={message.isLoading}
            />
            <input type="hidden" name="id" />
            {(formik.touched.text && formik.errors.text) || message.error ? (
              <p className="error">{formik.errors.text || message.error}</p>
            ) : null}
          </>
        ) : (
          <p>{message.text}</p>
        )}
        {auth.isAuthenticated && (auth.me.id === message.user.id || auth.me.role === 'ADMIN') && (
          <>
            {!isEdit ? (
              <>
                <button onClick={handleClickEdit} type="button" className="btn">
                  Edit
                </button>
                <button onClick={(e) => handleDelete(e, message.id)} type="button" className="btn">
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn" disabled={message.isLoading}>
                  Submit
                </button>
                <button
                  onClick={() => {
                    setIsEdit((oldIsEdit) => !oldIsEdit);
                    clearMessageError(message.id);
                  }}
                  type="button"
                  className="btn"
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteMessage, editMessage, clearMessageError })(Message);
