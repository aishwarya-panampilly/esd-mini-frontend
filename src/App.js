import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import FooterComponent from './components/common/Footer';
import UpdateUser from './components/pages/UpdateUser';
import UserManagementPage from './components/pages/UserManagement';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/auth/user-management" element={<UserManagementPage />} />
            <Route path="/auth/update/:employeeId" element={<UpdateUser />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;