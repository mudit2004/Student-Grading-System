// src/component/UpdateStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid, Box, Alert } from '@mui/material';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    rollNumber: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    subjects: [{ name: '', marks: '', hoursAttended: '' }],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/students/${id}`);
        const fetchedStudent = res.data;

        // Format dateOfBirth to 'yyyy-mm-dd'
        if (fetchedStudent.dateOfBirth) {
          fetchedStudent.dateOfBirth = new Date(fetchedStudent.dateOfBirth).toISOString().split('T')[0];
        }

        setStudent(fetchedStudent);
        setLoading(false);
      } catch (error) {
        setError('Error fetching student data. Please try again.');
        setLoading(false);
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...student.subjects];
    updatedSubjects[index][name] = value;
    setStudent((prevStudent) => ({
      ...prevStudent,
      subjects: updatedSubjects,
    }));
  };

  const addSubject = () => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      subjects: [...prevStudent.subjects, { name: '', marks: '', hoursAttended: '' }],
    }));
  };

  const deleteSubject = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
    if (confirmDelete) {
      const updatedSubjects = student.subjects.filter((_, i) => i !== index);
      setStudent((prevStudent) => ({
        ...prevStudent,
        subjects: updatedSubjects,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/students/${id}`, student);
      setSuccessMessage('Student updated successfully!');
      setTimeout(() => {
        navigate('/'); // Navigate after a brief delay
      }, 1500);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        setError(`Error updating student: ${error.response.data.message}`);
      } else {
        // Something happened in setting up the request
        setError('Error updating student. Please try again later.');
      }
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/students/${id}`);
        navigate('/'); // Navigate back to the Student List after deletion
      } catch (error) {
        setError('Error deleting student. Please try again.');
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Student
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={student.rollNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Subjects
        </Typography>
        {student.subjects.map((subject, index) => (
          <Box key={index} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Subject Name"
                  name="name"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(e, index)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Marks"
                  type="number"
                  name="marks"
                  value={subject.marks}
                  onChange={(e) => handleSubjectChange(e, index)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Hours Attended"
                  type="number"
                  name="hoursAttended"
                  value={subject.hoursAttended}
                  onChange={(e) => handleSubjectChange(e, index)}
                  min="0"
                  max="100"
                  required
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="secondary" onClick={() => deleteSubject(index)}>
              Delete Subject
            </Button>
          </Box>
        ))}

        <Button variant="outlined" onClick={addSubject} style={{ marginBottom: '20px' }}>
          Add Another Subject
        </Button>

        <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
          Update
        </Button>
      </form>

      <Button variant="contained" color="error" onClick={handleDelete} style={{ marginTop: '10px' }}>
        Delete Student
      </Button>
    </Container>
  );
}

export default UpdateStudent;
