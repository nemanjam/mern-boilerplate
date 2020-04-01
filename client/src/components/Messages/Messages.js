import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const Messages = ({ getMessages, message: { messages, isLoading, error } }) => {
  useEffect(() => {
    getMessages();
  }, []);

  if (isLoading) return 'Loading...';

  return (
    <div>
      <h2>Messages:</h2>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <span className="name">{message.user.name}</span>
            <span className="username">@{message.user.username}</span>
            <span className="time">{moment(message.createdAt).fromNow()}</span>
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, { getMessages })(Messages);
