import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function UpdateUser() {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [userData, setUserData] = useState({
    employeeRefId: '',
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    photographPath:'',
    department:'',
    password:''
  });

  useEffect(() => {
    if (employeeId){
        fetchUserDataById(employeeId);
    }
     // Pass the userId to fetchUserDataById
  }, [employeeId]); //wheen ever there is a chane in userId, run this  

  const fetchUserDataById = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing.');
        alert('Please log in again.');
        navigate('/login');
        return; // Prevent further execution
    }
      const response = await UserService.getUserById(employeeId, token); // Pass userId to getUserById
      const { employeeRefId,firstName,lastName, email, title,photographPath,department,password } = response.ourUsers;
      setUserData({ employeeRefId, firstName, lastName,email,title,photographPath,department, password });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.updateUser(employeeId, userData, token);
      console.log('User updated successfully:', response);
      alert('User details updated successfully!');
      navigate('/auth/user-management'); // Redirect to user management page
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details. Please try again.');
    }
  };


  return (
    <div className="auth-container">
      <h2>Modify Faculty Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Reference Id:</label>
          <input type="text" name="employeeRefId" value={userData.employeeRefId} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={userData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Photograph File Path:</label>
          <input type="text" name="photographPath" value={userData.photographPath} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input type="text" name="department" value={userData.department} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="text" name="password" value={userData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;