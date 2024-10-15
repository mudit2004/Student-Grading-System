// src/components/StudentProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, List, ListItem, ListItemText, Button } from '@mui/material';

function StudentProfile() {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error state
      try {
        const response = await axios.get(`http://localhost:3001/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/students/${id}`); // Send DELETE request
      navigate('/'); // Redirect to the home page after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student. Please try again later.'); // Set error message
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress /> {/* Loading spinner */}
      </Container>
    ); // Show loading state while fetching data
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography> {/* Error message */}
      </Container>
    ); // Show error message if there's an error
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {student.name}'s Profile
      </Typography>
      <Typography variant="body1">
        <strong>Roll Number:</strong> {student.rollNumber}
      </Typography>
      <Typography variant="body1">
        <strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString('en-GB')}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {student.email}
      </Typography>
      <Typography variant="body1">
        <strong>Phone:</strong> {student.phone}
      </Typography>
      <Typography variant="body1">
        <strong>CGPA:</strong> {student.cgpa ? student.cgpa.toFixed(2) : 'N/A'}
      </Typography>
      <Typography variant="body1">
        <strong>Grade:</strong> {student.grade || 'N/A'}
      </Typography>
      <Typography variant="body1">
        <strong>Overall Attendance Percentage:</strong> {student.attendancePercentage ? student.attendancePercentage.toFixed(2) + '%' : 'N/A'}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Subjects
      </Typography>
      <List>
        {student.subjects && student.subjects.length > 0 ? (
          student.subjects.map((subject, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={<strong>Subject Name:</strong>}
                secondary={
                  <>
                    <span>{subject.name}</span><br />
                    <strong>Marks Obtained:</strong> {subject.marks}<br />
                    <strong>Hours Attended:</strong> {subject.hoursAttended}
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>No subjects found.</ListItem> // Message if no subjects are present
        )}
      </List>

      {/* Delete Button */}
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Student
        </Button>
      </Box>
    </Container>
  );
}

export default StudentProfile;
