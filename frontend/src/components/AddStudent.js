// src/components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    rollNumber: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    subjects: [{ name: '', marks: '', hoursAttended: '' }],
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...student.subjects];
    newSubjects[index][field] = value;
    setStudent({ ...student, subjects: newSubjects });
  };

  const addSubject = () => {
    setStudent({
      ...student,
      subjects: [...student.subjects, { name: '', marks: '', hoursAttended: '' }],
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/; // Simple regex for 10-digit phone numbers
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(student.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(student.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/students', student);
      setStudent({
        name: '',
        rollNumber: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        subjects: [{ name: '', marks: '', hoursAttended: '' }],
      }); // Clear the form fields after submission
      navigate('/'); // Redirect to the student list after successful submission
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={student.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Roll Number"
          name="rollNumber"
          value={student.rollNumber}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={student.dateOfBirth}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={student.email}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          type="text"
          value={student.phone}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <Typography variant="h6" component="h3" gutterBottom>
          Subjects
        </Typography>
        {student.subjects.map((subject, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <TextField
              label="Subject Name"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Marks Obtained"
              type="number"
              value={subject.marks}
              onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hours Attended"
              type="number"
              value={subject.hoursAttended}
              onChange={(e) => handleSubjectChange(index, 'hoursAttended', e.target.value)}
              min="0"
              max="100"
              required
              fullWidth
              margin="normal"
            />
          </div>
        ))}
        <Button variant="contained" color="primary" onClick={addSubject}>
          Add Subject
        </Button>
        <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default AddStudent;
