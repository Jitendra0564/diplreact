// // src/contexts/AuthContext.js
// import React, { createContext, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     isAuthenticated: false,
//     isAdmin: false,
//     user: null
//   });
//   const navigate = useNavigate(); // Add useNavigate for redirection


//   const login = (userData) => {
//     setAuth({
//       isAuthenticated: true,
//       isAdmin: userData.isAdmin,
//       user: userData
//     });
//   };

//   const logout = () => {
//     setAuth({
//       isAuthenticated: false,
//       isAdmin: false,
//       user: null,
//     });
//     localStorage.removeItem('authenticateToken'); // Remove auth token from localStorage or cookies
//     navigate('/login', { replace: true }); // Redirect to login page after logout and replace history
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    isAdmin: false,
    user: null
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      isAdmin: userData.isAdmin,
      user: userData
    });
    localStorage.setItem('authenticateToken', userData.token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    });
    localStorage.removeItem('authenticateToken');
    sessionStorage.removeItem('authenticateToken');
    navigate('/login', { replace: true });
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);
  };

  const handleBackButton = () => {
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
