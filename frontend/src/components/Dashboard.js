// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, ArcElement, Legend } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, CircularProgress, Box, Paper } from '@mui/material';

// Register the components
Chart.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Legend);

function Dashboard() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3001/api/students');
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const countStudentsByGrade = () => {
    const gradeCounts = { A: 0, B: 0, C: 0, D: 0 };
    studentData.forEach(student => {
      if (student.grade) {
        gradeCounts[student.grade]++;
      }
    });
    return gradeCounts;
  };

  const gradeCounts = countStudentsByGrade();

  const barData = {
    labels: studentData.map(student => student.name || 'Unnamed'),
    datasets: [
      {
        label: 'CGPA',
        data: studentData.map(student => student.cgpa || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Grade A', 'Grade B', 'Grade C', 'Grade D'],
    datasets: [
      {
        data: [gradeCounts.A, gradeCounts.B, gradeCounts.C, gradeCounts.D],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return <CircularProgress />; // Show loading spinner while fetching data
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Show error message if there's an error
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h5">Number of Students by Grade</Typography>
        <List>
          <ListItem>Grade A: {gradeCounts.A}</ListItem>
          <ListItem>Grade B: {gradeCounts.B}</ListItem>
          <ListItem>Grade C: {gradeCounts.C}</ListItem>
          <ListItem>Grade D: {gradeCounts.D}</ListItem>
        </List>
      </Paper>

      {studentData.length > 0 ? (
        <Box style={{ marginBottom: '16px' }}>
          <Bar data={barData} />
        </Box>
      ) : (
        <Typography>No student data available for bar chart</Typography>
      )}

      <Typography variant="h5" gutterBottom>
        Grade Distribution
      </Typography>
      <Box style={{ marginBottom: '16px' }}>
        {studentData.length > 0 ? (
          <Pie data={pieData} options={pieOptions} />
        ) : (
          <Typography>No student data available for pie chart</Typography>
        )}
      </Box>

      <Typography variant="h5" gutterBottom>
        Students List
      </Typography>
      <List>
        {studentData.length > 0 ? (
          studentData.map(student => (
            <ListItem key={student._id}>
              <Link to={`/student/${student._id}`}>{student.name}</Link>
            </ListItem>
          ))
        ) : (
          <ListItem>No students available.</ListItem>
        )}
      </List>
    </Container>
  );
}

export default Dashboard;
