import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    paddingBottom: '20px', 
  };

  const inputStyles = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '15px',
  };

  const buttonStyles = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  };

  const buttonHoverStyles = {
    backgroundColor: '#45a049',
  };

  const labelStyles = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',  
    alignItems: 'center',     
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',         
    padding: '10px',            
  };

  const copyrightStyles = {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    color: '#888',
    marginTop: '20px',  
    padding: '10px 0',
  };

  return (
    <div style={containerStyles}>
      <div style={formStyles}>
        <h2>Welcome to Main Server</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={labelStyles}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyles}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyles}
            />
          </div>
          <button
            type="submit"
            style={buttonStyles}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Login
          </button>
        </form>
      </div>
      <div style={copyrightStyles}>
        <p>&copy; 2024 Mahen Mahindaratne. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Login;