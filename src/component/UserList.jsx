import React, { useEffect, useState } from 'react';
import '../componentcss/userlist.css';
import { useDispatch } from 'react-redux';
import getData from './redux/Action/action';

export default function UserList({ userData, userProfile }) {
  const [sentRequests, setSentRequests] = useState([]);
  const dispatch = useDispatch()
  useEffect(() =>{
  dispatch(getData(userData))
  })

  const handleSendFriendRequest = async (recipientId) => {
    try {
      const senderId = `${userProfile._id}`;
      console.log('senderId:', senderId);
      const response = await fetch(`http://localhost:5000/sendFriendRequest/${recipientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId, userProfile }),
      });

      if (response.ok) {
        console.log('Friend request sent to user ID:', recipientId);
        alert('Your request was sent successfully');
        setSentRequests([...sentRequests, recipientId]);
      } else {
        const errorText = await response.text();
        console.error('Error sending friend request:', errorText);
        alert('Failed to send friend request: ' + errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='userList'>
        <h3>User List</h3>
        {userData && userData[0].map((user) => (
          localStorage.getItem('userId') !== user._id && (
            <div className='indiuser' key={user._id}>
              <p>{user.Name}</p>
              <p>{user._id}</p>
              {!sentRequests.includes(user._id) && (
                <button onClick={() => handleSendFriendRequest(user._id)} className='hoverButton'>
                  Send Friend Request
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
