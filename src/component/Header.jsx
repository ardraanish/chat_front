import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from './Api'; 

function Header() {
  const { id } = useParams();
  console.log(id,'hgdxvjhhcgcgv chdgf')
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const { username } = location.state || {}; 
  const fetchUserDetails = async () => {
    if (!id) {
      console.error('userId is undefined.');
      return;
    }

    try {
      const response = await apiClient.get(`/users/${id}`, { withCredentials: true });
      setUserName(response.data.username);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return (
    <div className="header" style={{color:'white'}}>
      <h3>{username ? `${username}` : 'No user selected'}</h3>

    </div>
  );
}

export default Header;
