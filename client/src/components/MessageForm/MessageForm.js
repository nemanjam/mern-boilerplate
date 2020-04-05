import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import { addMessage } from '../../store/actions/messageActions';
import { messageFormSchema } from './validation';

import './styles.css';

const MessageForm = ({ addMessage, message: { messages } }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: messageFormSchema,
    onSubmit: (values, { resetForm }) => {
      addMessage({ text: values.text });
      resetForm();
    },
  });

  const isSubmiting = messages.some((m) => m.id === 0);

  return (
    <div className="message-form">
      <h2>Write a message</h2>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write a message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={isSubmiting}
        />
        {formik.touched.text && formik.errors.text ? (
          <p className="error">{formik.errors.text}</p>
        ) : null}
        <input type="submit" className="btn" value="Add Message" disabled={isSubmiting} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { addMessage })(MessageForm);
