import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
// import axios from 'axios';
import MessageList from './MessageList';
import './messagecss/messageform.css'

const socket = io('http://localhost:5000');


const MessageForm = ({ sender, recipient }) => {
  const [content, setContent] = useState('');
  const [file,setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleIconClick = () =>{
    fileInputRef.current.click()
    // console.log('fileInputRef:-',fileInputRef)
  }

  const handleChangeFile = (e) =>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  }

  useEffect(() => {
    // Join a specific room for the sender and recipient
    socket.emit('joinRoom', { sender, recipient });

    return () => {
      // Leave the room when the component unmounts
      socket.emit('leaveRoom', { sender, recipient });
    };
  }, [sender, recipient]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('recipient', recipient);
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }
    // const headers = file ? {'Content-Type': 'multipart/form-data'} : { 'Content-Type': 'application/json' };

    console.log('file:-',file)
    console.log('Payload being sent:', formData);

    try {
      const response = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data for messageForm:', responseData);
        socket.emit('message', { content, file: file ? file : null });
        setContent('');
        setFile(null);
        console.log('content-file',content,file)

      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };
  // console.log('file:-',file)


  return (
    <div className='messageform'>
      <div clsssName = 'messagelist'>
        <MessageList sender={sender} recipient={recipient} content={content} file={file}/>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          // required
          className='textarea'
        ></input>
<input
          type="file"
          ref={fileInputRef}
          onChange={handleChangeFile}
          style={{ display: 'none' }}
        />
        
                <h1 className='small'><i class="bi bi-files" onClick={handleIconClick}></i></h1>

        <button type="submit" className='button'>Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
