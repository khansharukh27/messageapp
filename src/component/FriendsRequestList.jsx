import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../componentcss/friendRequest.css';

export default function FriendsRequestList({ userProfile }) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [hoveredRequest, setHoveredRequest] = useState(null);
  const result = useSelector((state) => state.reducers?.getDatas?.[0]?.[0] || []);
  console.log('result in friendrequestlist:',result)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getDatabyFriend');
        if (response.ok) {
          const data = await response.json();
          setFriendRequests(data);
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    fetchRequestData();
  }, []);

  const friendRequestAccept = async (userId) => {
    const senderId = `${userProfile._id}`;
    try {
      const response = await fetch(`http://localhost:5000/acceptFriendRequest/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId }),
      });

      if (response.ok) {
        navigate('/friend_list');
        console.log('Friend request has been successfully accepted');
      } else {
        const errorText = await response.text();
        console.error('Error accepting friend request:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const friendRequestCancel = async (userId) => {
    const senderId = `${userProfile._id}`;
    try {
      const response = await fetch(`http://localhost:5000/cancelFriendRequest/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId }),
      });
      if (response.ok) {
        setFriendRequests(friendRequests.filter(request => request._id !== userId));
        alert('Request canceled successfully');
      } else {
        const errorText = await response.text();
        console.error('Error canceling friend request:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='frlm'>
      <h3>Friend Request List</h3>
      {friendRequests.map((user) => (
        user.status === 'pending' && localStorage.getItem('userId') === user.userId1 ? (
          <div
            className='friendRequests'
            key={user.userId2}
            onMouseEnter={() => setHoveredRequest(user.userId2)}
            onMouseLeave={() => setHoveredRequest(null)}
          >
            {result && result.map((use) => (
              user.userId2 === use._id ? (<div key={use._id}>
                <p>{use.Name}</p>
                <p>{use._id}</p>
                </div>):null
            ))}
            {hoveredRequest === user.userId2 && (
              <div className='btndiv'>
                <div>
                  <button className="btn" onClick={() => friendRequestAccept(user.userId2)}>Accept</button>
                </div>
                <div>
                  <button className='btn' onClick={() => friendRequestCancel(user.userId2)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ) : null
      ))}
    </div>
  );
}
