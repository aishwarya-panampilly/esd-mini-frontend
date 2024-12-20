import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import '../presentation/UserManagement.css'

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch users data when the component mounts
    

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) throw new Error("Unauthorized access. Please log in.");
      const response = await UserService.getAllUsers(token);
      console.log(response);
      if (response && Array.isArray(response.employeesList)) {
        const filteredUsers = response.employeesList.filter(user => user.title !== "ROLE_ADMIN");
        setUsers(filteredUsers); // Set the employee list to the state
      } else {
        throw new Error("Invalid response format: Expected 'employeesList' to be an array.");
      }// Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
      setError("Failed to load users. Please try again.");
    }
  };
  fetchUsers();
}, []);
if (error) {
    return <p className="error-message">{error}</p>;
}

  return (
    <div className="user-management-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Course Code</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.employeeId}>
              <td>{user.employeeRefId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td >
                  {user.photographPath ? (
                  <img 
                      src={user.photographPath} 
                      alt={`${user.firstName} ${user.lastName}`} 
                      className='photo'
                  />
                  ) : (
                  'N/A'
                  )}
              </td>
              <td>{user.facultyCourses && user.facultyCourses.length > 0 ? user.facultyCourses.map(fc => fc.course.courseCode).join(', ') : 'N/A'}</td>
              <td>
                <button><Link to={`/auth/update/${user.employeeId}`}>
                  Update
                </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;