import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Loging from './component/Loging';
import SignUp from './component/SignUp';
import ResetPassword from './component/ResetPassword';
import ProfilePage from './component/ProfilePage';
// import MessagePage from './component/MessagePage';
import FriendsRequestList from './component/FriendsRequestList';
import UserList from './component/UserList';
import FriendList from './component/FriendList';
// import MessageForm from './component/Message/MessageForm';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* Redirect to login page if not logged in */}
        {!localStorage.getItem('loggedInEmail') ? (
          <Route
            path="/"
            element={<Loging/>}
          />
        ) : (
          <Route path="/" element={<ProfilePage />} />
        )}

        <Route path='/loging' element={<Loging />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path='/messageForm' element={<MessageForm/>}/> */}
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/friend_request_list" element={<FriendsRequestList />} />
        <Route path="/user_list" element={<UserList />} />
        <Route path="/friend_list" element={<FriendList />} />
      </Routes>
    </Router>
  );
};

export default App;
