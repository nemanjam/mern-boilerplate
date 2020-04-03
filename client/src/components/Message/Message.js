import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteMessage, editMessage } from '../../store/actions/messageActions';

import './styles.css';

const Message = ({ message, auth, messageRedux, deleteMessage, editMessage }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(message.text);

  const handleDeleteOrEdit = (e, id) => {
    e.preventDefault();
    if (!isEdit) {
      deleteMessage(id);
    } else {
      editMessage(id, { text });
      setIsEdit(false);
    }
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
      {isEdit ? (
        <textarea
          onChange={e => setText(e.target.value)}
          value={text}
          disabled={messageRedux.isLoadingMessageId === message.id}
        />
      ) : (
        <p style={messageRedux.isLoadingMessageId === message.id ? { backgroundColor: 'red' } : {}}>
          {message.text}
        </p>
      )}
      {auth.isAuthenticated && auth.me.id === message.user.id && (
        <>
          <button onClick={() => setIsEdit(oldIsEdit => !oldIsEdit)} type="button" className="btn">
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
          <button onClick={e => handleDeleteOrEdit(e, message.id)} type="button" className="btn">
            {isEdit ? 'Submit' : 'Delete'}
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  messageRedux: state.message,
});

export default connect(mapStateToProps, { deleteMessage, editMessage })(Message);
