import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Main = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]); // New state for friend requests
  const socket = io('http://localhost:5000'); // Establishing connection to server

 

  const fetchFriends = () => {
    // Fetch friends list from the server
    fetch(`http://localhost:5000/friends/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFriends(data.friends);
      })
      .catch((error) => console.error('Error fetching friends:', error));

    // Fetch friend requests from the server
    fetch(`http://localhost:5000/friend_requests/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendRequests(data.friendRequests);
      })
      .catch((error) => console.error('Error fetching friend requests:', error));
  };

  useEffect(() => {
    // Listen for 'message' event from the server
    socket.on('message', (newMessage) => {
      // Add the received message to the state
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    },[socket]);

    // Listen for 'friend_request' event from the server
    socket.on('friend_request', (senderId) => {
      // Add the friend request to the state
      setFriendRequests((prevRequests) => [...prevRequests, { id: Math.random(), senderId }]);
    });

    // Fetch friends list and friend requests on component mount
    fetchFriends();

    // Clean up event listeners when component unmounts
    return () => {
      socket.off('message');
      socket.off('friend_request');
    };
  });
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      // Send the message to the server
      socket.emit('message', { content: message });
      setMessage('');
    }
  };

  const acceptFriendRequest = (senderId) => {
    // Send request to the server to accept friend request
    fetch(`http://localhost:5000/friend_requests/${senderId}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchFriends(); // Fetch updated friends list and friend requests
      })
      .catch((error) => console.error('Error accepting friend request:', error));
  };

  return (
    <div>
      <div>
        {receivedMessages.map((msg, index) => (
          <div key={index}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message here"
          name = 'messages'
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Friend Requests</h2>
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id}>
              User {request.senderId} wants to be your friend.{' '}
              <button onClick={() => acceptFriendRequest(request.senderId)}>Accept</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
