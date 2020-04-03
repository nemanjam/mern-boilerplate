import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addMessage } from '../../store/actions/messageActions';

import './styles.css';

const MessageForm = ({ addMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addMessage({ text });
    setText('');
  };

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
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" className="btn" value="Add Message" />
      </form>
    </div>
  );
};

export default connect(null, { addMessage })(MessageForm);
