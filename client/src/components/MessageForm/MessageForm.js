import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../../store/actions/messageActions';

import './styles.css';

const MessageForm = ({ addMessage, message: { messages } }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({ text });
    setText('');
  };

  const isSubmiting = messages.some((m) => m.id === 0);

  return (
    <div className="message-form">
      <h2>Write a message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmiting}
        />
        <input type="submit" className="btn" value="Add Message" disabled={isSubmiting} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { addMessage })(MessageForm);
