// // src/contexts/AuthContext.js
// import React, { createContext, useState, useContext,useEffect } from 'react';
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
//      sessionStorage.removeItem('authenticateToken');
//     navigate('/login', { replace: true }); // Redirect to login page after logout and replace history
//      window.history.pushState(null, '', window.location.href);
//     window.addEventListener('popstate', handleBackButton);
//   };
//   const handleBackButton = () => {
//     navigate('/login', { replace: true });
//   };

//    useEffect(() => {
//     return () => {
//       window.removeEventListener('popstate', handleBackButton);
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
  
// };
// src/contexts/AuthContext.js
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
    user: null,
    loading: true // Add a loading state
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getCookieValue('token');
      const isAdmin = getCookieValue('isAdmin') === 'true';
      if (token) {
        setAuth({
          isAuthenticated: true,
          isAdmin,
          user: null, // You might want to fetch user data here
          loading: false
        });
      } else {
        setAuth({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
          loading: false
        });
        if (!location.pathname.startsWith('/login')) {
          navigate('/login', { replace: true });
        }
      }
    };

    checkAuthStatus();
  }, [location, navigate]);

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      isAdmin: userData.isAdmin,
      user: userData,
      loading: false
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      loading: false
    });
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to get cookie value
const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};