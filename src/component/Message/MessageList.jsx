import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import axios from 'axios';
import MessageItem from './MessageItem';

const socket = io('http://localhost:5000') 

const MessageList = ({ sender, recipient ,content}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/messages/${sender}/${recipient}`);
        // const data = await response.json()
        if(response.ok){
          const data =await response.json()
          console.log('sender,recipient:-',sender,recipient)
          setMessages(data);
          console.log('data in message list:-',data)
          // console.log('response.data in message list',data.file)
          
        }
        
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages();
    
    socket.on('message', (message) => {
      if (message.sender === sender && message.recipient === recipient) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [sender, recipient,content]);
console.log('messagelist messages:-',messages)
  return (
    <div className='messageList'>
      {messages && messages.map((message) => (
        <MessageItem  key={message._id} message={message} sender={sender} recipient = {recipient}/>
      ))}
    </div>
  );
};

export default MessageList;
