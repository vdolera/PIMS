import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Admin"); // fallback value

  useEffect(() => {
    // Simulate loading and fetch username
    const timeout = setTimeout(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
      setLoading(false);
    }, 2000); // 2s delay like animation

    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // optional: clear username on logout
    navigate("/login");
  };

  return (
    <Layout username={username} onLogout={handleLogout}>
      <div className='Profile-Content'>
        {loading ? (
          <div className="skeleton-loader">
            <div className='image1'></div>
            <div className='UserDeets21'>
              <div className='Name1'>s<div className='textbox1'></div></div>
              <div className='Admin-ID1'>s<div className='textbox1'></div></div>
            </div>
            <div className='UserDeets1'></div>
          </div>
        ) : (
          <>
            <div className='image'></div>
            <div className='UserDeets2'>
              <div className='Name'>Name
                <div className='textbox'>{username}</div>
              </div>
              <div className='Admin-ID'>Admin ID
                <div className='textbox'>12-00138</div>
              </div>
            </div>
            <div className='UserDeets'></div>
          </>
        )}
      </div>
    </Layout>
  );
}