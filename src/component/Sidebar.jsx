

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePic from './image/th.jpg';
import apiClient from './Api';

function Sidebar() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users', {
        withCredentials: true,
      });
      setUsers(response.data);
      console.log(response.data)
      const currentUser = response.data.find(user => users._id === loggedInUser?._id);
      setLoggedInUser(currentUser);
      console.log(loggedInUser)
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (userId, username) => {
    console.log('Selected User ID:', userId,username);
    navigate(`/chat/${userId}`, { state: { username } });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const filteredUsers = users.filter(user => user._id !== loggedInUser?._id);

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>My ChatApp</div>
      <div style={styles.searchBar}>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
      </div>
      <div style={styles.contacts}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              style={styles.contact}
              onClick={() => handleSelectUser(user._id, user.username)} // Pass username here
            >
              <div style={styles.contactDetails}>
                <img
                  src={user.profilePic || defaultProfilePic} // Show default picture if user doesn't have one
                  alt={user.username}
                  style={styles.profilePic}
                />
                <div style={styles.usernameContainer}>
                  <h2 style={styles.username}>{user.username}</h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noUsers}>No users available</p>
        )}
      </div>
      <div style={{padding:'20px',borderTop: '3px solid white'}}>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    backgroundColor: '#1F2C34',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '96vh',
    borderRight: '1px solid black',
    position: 'relative',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  searchBar: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
  },
  contacts: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '60px',
  },
  contact: {
    padding: '10px',
    borderBottom: '1px solid #3b3e44',
    cursor: 'pointer',
    fontSize: '16px',
  },
  contactDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  usernameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  username: {
    margin: 0,
    fontSize: '16px',
  },
  logoutButton: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    padding: '10px 15px',
    backgroundColor: '#ff4757',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  noUsers: {
    textAlign: 'center',
    color: '#bdc3c7',
    marginTop: '20px',
  },
};

export default Sidebar;
