import React, { useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';

const MessageForm = ({}) => {
  const [text, setText] = useState('');

  return (
    <div className="message-form">
      <h2>Write a message</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          setText('');
        }}
      >
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

export default connect(null, {})(MessageForm);
