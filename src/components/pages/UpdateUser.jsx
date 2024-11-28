import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import '../presentation/UpdateUser.css'

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

  const [courses, setCourses] = useState([]); // Holds the list of courses
  const [selectedCourse, setSelectedCourse] = useState(''); // Holds the selected course ID

  useEffect(() => {
    const fetchUserDataById = async (employeeId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing.');
          alert('Please log in again.');
          navigate('/login');
          return;
        }
        const response = await UserService.getUserById(employeeId, token);
        const { employeeRefId, firstName, lastName, email, title, photographPath, department, password } = response.ourUsers;
        setUserData({ employeeRefId, firstName, lastName, email, title, photographPath, department, password });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const fetchAllCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing.');
          alert('Please log in again.');
          navigate('/login');
          return;
        }
        const response = await fetch('http://localhost:8080/auth/courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data.statusCode === 200) {
          setCourses(data.courseList);
        } else {
          console.error(data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    if (employeeId) {
      fetchUserDataById(employeeId);
    }
    fetchAllCourses();
  }, [employeeId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleCourseChange = (e) => {
    const selectedId = e.target.value; // Get the selected course ID
    setSelectedCourse(selectedId); // Update the selected course state
    console.log("Selected course ID: ", selectedId); // Log the selected course ID
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Selected course ID before submit:", selectedCourse);
      const token = localStorage.getItem('token');
      // Include the selected course ID in the userData
      const updatedData = { ...userData, courseId: selectedCourse };
      console.log("Updated Data Sent to Backend: ", updatedData);
      const response = await UserService.updateUser(employeeId, updatedData, token);
      console.log('User updated successfully:', response);
      alert('User details updated successfully!');
      navigate('/auth/user-management');
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
          <label>Courses:</label>
          <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select a course</option>
          {courses.map((course) => (
          <option key={course.courseId} value={course.courseId}>
          {course.courseCode} {/* Assuming courseCode is what you want to display */}
          </option>
          ))}
          </select>
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