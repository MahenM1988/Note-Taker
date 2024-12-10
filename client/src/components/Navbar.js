import React from 'react';

const Navbar = ({ username, handleLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.branding}>
      <h1 style={styles.logo}>Welcome to the Main Server</h1>
    </div>

    <div style={styles.navItems}>
      {username ? (
        <>
          <span style={styles.welcomeText}>Hello, {username}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <button style={styles.loginButton}>
          Login
        </button>
      )}
    </div>
  </nav>
);

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '1px',
    margin: 0,
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  welcomeText: {
    fontSize: '16px',
    fontWeight: '500',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#28a745',
    border: 'none',
    color: '#fff',
  },
  icon: {
    marginRight: '8px',
  },
};

export default Navbar;
