import React, { useEffect, useState } from 'react';
import '../componentcss/friendList.css';
import MessageForm from './Message/MessageForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const [hoveredFriend, setHoveredFriend] = useState(null); // State to track hovered friend
  const [selectedFriend, setSelectedFriend] = useState(null);
  const result = useSelector((state) => state.reducers?.getDatas?.[0]?.[0] || []);
  console.log('result:-', result)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await fetch('http://localhost:5000/accepted');
        if (response.ok) {
          const data = await response.json();
          const filterData = data.filter((item) => item.status === 'accepted' && item.userId1 === localStorage.getItem('userId'));
          setFriendList(filterData);
          console.log('Filtered Friend List', filterData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriendData();
  }, []);

  const handleChatCreate = (friend) => {
    setSelectedFriend(friend);
    console.log('Selected Friend:', friend);
  };

  const handleDeleteUser = async (userId) => {
    const senderId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:5000/deleteFriendRequest/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId }),
      });
      if (response.ok) {
        setFriendList(friendList.filter(friend => friend.userId2 !== userId));
        console.log('Friend request cancelled successfully');
      } else {
        console.error('Failed to cancel friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to cancel friend request:', error);
    }
  };

  return (
    <div className='friendlist'>
      <div className='friendlistmap'>
        <div className='friendbtn'>
          <button onClick={() => navigate('/')}>Sent Friend Request</button>
        </div>
        {friendList.length > 0 ? (
          <div>
            {friendList.map((user) => (
              <div
                key={user.userId2}
                className='list-item'
                onMouseEnter={() => setHoveredFriend(user.userId2)}
                onMouseLeave={() => setHoveredFriend(null)}
              >
                {result && result.map((use) => (
                  user.userId2 === use._id && (
                    <div key={use._id}>
                      <p>{use.Name}</p>
                      {/* <p>{use._id}</p> */}
                      {hoveredFriend === user.userId2 && (
                        <div className='btndiv'>
                          <button className="btn" onClick={() => handleChatCreate(user)}>Chat</button>
                          <button className='btn' onClick={() => handleDeleteUser(user.userId2)}>Delete</button>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>Please send friend request to your friend</p>
        )}
      </div>
      <div className='messageformdiv'>
        {selectedFriend && (
          <MessageForm sender={selectedFriend.userId1} recipient={selectedFriend.userId2} />
        )}
      </div>
    </div>
  );
}
