import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useFormik } from 'formik';

import { deleteMessage, editMessage } from '../../store/actions/messageActions';
import { messageFormSchema } from './validation';

import './styles.css';

const Message = ({ message, auth, messageRedux, deleteMessage, editMessage }) => {
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
      resetForm();
    },
  });

  return (
    <div className={message.isLoading ? 'message active' : 'message'}>
      <div className="message-header">
        <img src={message.user.avatar} className="avatar" />
        <div>
          <span className="name">{message.user.name}</span>
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
            {formik.touched.text && formik.errors.text ? (
              <p className="error">{formik.errors.text}</p>
            ) : null}
          </>
        ) : (
          <p>{message.text}</p>
        )}
        {auth.isAuthenticated && auth.me.id === message.user.id && (
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
                  onClick={() => setIsEdit((oldIsEdit) => !oldIsEdit)}
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
  messageRedux: state.message,
});

export default connect(mapStateToProps, { deleteMessage, editMessage })(Message);
