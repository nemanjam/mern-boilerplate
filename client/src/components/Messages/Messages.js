import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMessages } from '../../store/actions/messageActions';
import './styles.css';

const Messages = ({ getMessages, message: { messages, isLoading, error }, auth }) => {
  useEffect(() => {
    getMessages();
  }, []);

  if (isLoading) return 'Loading...';

  return (
    <div>
      <h2>Messages:</h2>
      {messages.map((message, index) => {
        return (
          <div key={index} className="message">
            <div className="message-header">
              <img src={message.user.avatar} className="avatar" />
              <div>
                <span className="name">{message.user.name}</span>
                <span className="username">@{message.user.username}</span>
                <span className="time">{moment(message.createdAt).fromNow()}</span>
              </div>
            </div>
            <p>{message.text}</p>
            {auth.isAuthenticated && auth.me.id === message.user.id && (
              <button className="btn">Delete Message</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages })(Messages);
