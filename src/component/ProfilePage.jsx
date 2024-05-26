import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Main from './Main';
import '../componentcss/profile.css'
import FriendsRequestList from './FriendsRequestList';
import UserList from './UserList';
// import {useDispatch} from 'react-redux'
// import getData from './redux/Action/action';


const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userData, setUserData] = useState('')
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log('userData1:',userData)
  useEffect(() => {
    const fetchProfile = async () => {
      const loggedInEmail = localStorage.getItem('loggedInEmail');
      if (!loggedInEmail) {
        alert('Email not found in local storage');
        return; // Exit if email is not found
      }

      try {
        const response = await fetch(`http://localhost:5000/Profile?loggedInEmail=${loggedInEmail}`);
        console.log('loggedInEmail:-', loggedInEmail)
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.userProfile);
          // dispatch(getData(userData))
          console.log('profileData:-', data)
        } else {
          alert('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Error fetching profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = () => {
    localStorage.removeItem('loggedInEmail')
    navigate('/signup')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getData')
        if (response.ok) {
          const data = await response.json()
          

          setUserData([data])
          console.log('responseData:-',data)
          // console.log('userData',userData)

        }

      } catch (error) {
        console.log('error fetching data:-', error)
      }
    }
    fetchData()
  }, [userProfile])

  
  
  return (
    <div className='main'>
      <div className='main2'>
        {userProfile ? (
          <div className='userData'>
            <h2>{userProfile.Name}'s Profile</h2>
            <p>Name: {userProfile.Name}</p>
            <p>Mobile Number: {userProfile.PhoneNumber}</p>
            <p>Email: {userProfile.Email}</p>
          </div>
        ) : (
          <p className='error'>Loading...</p>
        )}
        <div>
          <button onClick={handleDelete} className='button'>log out</button>
          <button onClick={()=>navigate('/friend_list')} className='button'>friend list</button>
        </div>
      </div>
      <div>
        <UserList userData={userData} userProfile={userProfile}/>
      </div>
      <div>
        <FriendsRequestList userProfile = {userProfile} userData = {userData}/>
      </div>
    </div>
  );
};

export default ProfilePage;
