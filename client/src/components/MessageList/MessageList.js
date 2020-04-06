import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Message from '../Message/Message';
import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const MessageList = ({ getMessages, message: { messages, isLoading, error } }) => {
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="message-list">
      <h2>Messages:</h2>
      <div className="list">
        {isLoading
          ? 'Loading...'
          : messages.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { getMessages })(MessageList);
