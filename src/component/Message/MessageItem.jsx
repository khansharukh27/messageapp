import React, { useState } from 'react';
import './messagecss/messageItem.css';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:5000');

const MessageItem = ({ message, sender ,recipient}) => {
  const isSender = message.sender === localStorage.getItem('userId');

  const [likeBgColor, setLikeBgColor] = useState(false);
  const [dislikeBgColor, setDislikeBgColor] = useState(false);
  const result = useSelector((state) => state.reducers?.getDatas?.[0]?.[0] || []);
  console.log('result in messageItem:-',result)
  const handleLikeClick = async () => {
    const response = await fetch(`http://localhost:5000/messages/${message._id}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ like: !likeBgColor, dislike: false })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('like data:', data);
      setLikeBgColor(true);
      setDislikeBgColor(false);
      console.log(`your message by ${sender} and message id ${message._id}`);
      socket.emit('message', data.likes); // Emit the updated message object
    }
  };

  const handleDislikeClick = async () => {
    const response = await fetch(`http://localhost:5000/messages/${message._id}/dislike`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ like: false, dislike: !dislikeBgColor, sender: sender })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('dislike data', data);
      setDislikeBgColor(true);
      setLikeBgColor(false);
      console.log(`your message by ${sender} and message id ${message._id}`);
      socket.emit('message', data.dislikes); // Emit the updated message object
    }
  };

  // Construct the file URL if a file is attached
  // console.log('file:-',message)

  const findRecipientName = () => {
    const recipients = result.find(item => item._id === recipient);
    console.log('recipients:-',recipients)
    return recipients.Name
  };

  const recipientName = findRecipientName();

console.log('reciepent:-',recipient)
  return (
    <div className={`message-item ${isSender ? 'right' : 'left'}`}>
      <div className='main_div'>
      <p>
          <strong>
            {isSender ? 'You' :recipientName }
          </strong>: {message.content}
        </p>

        <div>
          {message.file ? (
            message.file.endsWith('.png') || message.file.endsWith('.jpg') || message.file.endsWith('.jpeg') ? (
              <div>
                <img src={`http://localhost:5000${message.file}`} alt="Preview" style={{ width: '100px', height: '100px' }} />
                <a href={`http://localhost:5000${message.file}`} target="_blank" rel="noopener noreferrer" style={{}}>
                  Download nows</a>

              </div>

            ) : (
              <a href={`http://localhost:5000${message.file}`} target="_blank" rel="noopener noreferrer">{`${message.file}`} Download File</a>
            )
          ) : null}
        </div>


        <p><small>{new Date(message.timestamp).toLocaleString()}</small></p>
      </div>

      <div className='iconDiv'>
        <i className="bi bi-hand-thumbs-up m-2 color-primary" style={{ color: 'black', fontSize: '20px', fontWeight: 900, backgroundColor: likeBgColor ? 'green' : 'white' }} onClick={handleLikeClick}>like</i>
        <i className="bi bi-hand-thumbs-down m-2" style={{ color: 'black', fontSize: '20px', fontWeight: 900, backgroundColor: dislikeBgColor ? 'red' : 'white' }} onClick={handleDislikeClick}>dislike</i>
      </div>
    </div>
  );
};

export default MessageItem;
