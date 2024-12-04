import React, { useEffect, useState } from 'react';
import apiClient from './Api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add token if needed
          },
        });
        console.log(data,'data')
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
