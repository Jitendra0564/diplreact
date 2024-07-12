// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext'; // Import AuthProvider
import Home from './pages/Home';
import Login from './pages/Login';
import Companies from './pages/Companies';
import AdminPanel from './pages/Adminpannel';
import UserPanel from './pages/Userpanel';
import Task from './pages/Task';
import Users from './pages/Users';
import Tools from './pages/Tools';
import Meeting from './components/Tool/Meetings/MeetingsSystem';
import UsersProfile from './components/Users/UsersProfile';
import Todo from './pages/Todo';
import CompaniesProfile from './components/Companies/CompaniesProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/company" element={<Companies />} />
          <Route path="/User1" element={<UserPanel />} />
          <Route path="/task" element={<Task />} />
          <Route path="/user" element={<Users />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/userprofile/:userId" element={<UsersProfile />} />
          <Route path="/companyprofile/:CompanyId" element={<CompaniesProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
