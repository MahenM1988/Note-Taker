import React, { useState } from 'react';
import '../App.css';  // Import the updated CSS

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to the Note Taker App</h2>
        <p>Use Admin as the Username, and 123 as the Password</p>
        <p><strong><i>Please be advised that there may be latency in backend responses due to the use of a free instance on Render. This instance may enter a dormant state when idle, leading to startup delays that can exceed 50 seconds for incoming requests.</i></strong></p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button
            type="submit"
            className="button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
