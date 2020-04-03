import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteMessage } from '../../store/actions/messageActions';

import './styles.css';

const Message = ({ message, auth, deleteMessage }) => {
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteMessage(id);
  };

  return (
    <div className="message">
      <div className="message-header">
        <img src={message.user.avatar} className="avatar" />
        <div>
          <span className="name">{message.user.name}</span>
          <span className="username">@{message.user.username}</span>
          <span className="time text-light">{moment(message.createdAt).fromNow()}</span>
        </div>
      </div>
      <p>{message.text}</p>
      {auth.isAuthenticated && auth.me.id === message.user.id && (
        <button onClick={e => handleDelete(e, message.id)} className="btn">
          Delete Message
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteMessage })(Message);
