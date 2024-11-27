import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import '../presentation/Navbar.css'

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());

  useEffect(() => {
    // Listen for changes in localStorage (like login/logout)
    const handleStorageChange = () => {
      setIsAuthenticated(UserService.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      UserService.logout();
    }
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && <li><Link to="/">Academic ERP</Link></li>}
        {isAuthenticated && <li><Link to="/auth/user-management">Faculty List</Link></li>}
        {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
