import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, ArcElement, Legend, TimeScale, LineElement, PointElement } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, CircularProgress, Box, Paper, Grid } from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Legend, TimeScale, LineElement, PointElement);

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

  const attendanceData = {
    labels: studentData.map(student => student.name || 'Unnamed'),
    datasets: [
      {
        label: 'Attendance Percentage',
        data: studentData.map(student => student.attendancePercentage || 0),
        borderColor: 'rgba(255, 99, 132, 0.6)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
      },
    ],
  };

  const cgpaData = {
    labels: ['Below 5', '5-7', '7-9', '9-10'],
    datasets: [
      {
        data: [
          studentData.filter(student => student.cgpa < 5).length,
          studentData.filter(student => student.cgpa >= 5 && student.cgpa < 7).length,
          studentData.filter(student => student.cgpa >= 7 && student.cgpa < 9).length,
          studentData.filter(student => student.cgpa >= 9).length,
        ],
        backgroundColor: ['#FF6347', '#FFA500', '#32CD32', '#4682B4'],
      },
    ],
  };

  const subjectAverages = studentData.reduce((acc, student) => {
    student.subjects.forEach(subject => {
      acc[subject.name] = acc[subject.name] || { total: 0, count: 0 };
      acc[subject.name].total += subject.marks;
      acc[subject.name].count++;
    });
    return acc;
  }, {});

  const averageSubjectData = {
    labels: Object.keys(subjectAverages),
    datasets: [
      {
        label: 'Average Marks',
        data: Object.values(subjectAverages).map(subj => subj.total / subj.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5">Number of Students by Grade</Typography>
            <List>
              <ListItem>Grade A: {gradeCounts.A}</ListItem>
              <ListItem>Grade B: {gradeCounts.B}</ListItem>
              <ListItem>Grade C: {gradeCounts.C}</ListItem>
              <ListItem>Grade D: {gradeCounts.D}</ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              CGPA per Student
            </Typography>
            <Box style={{ width: '100%', height: '400px' }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              Grade Distribution
            </Typography>
            <Box style={{ maxWidth: '300px', margin: '0 auto' }}>
              <Pie data={pieData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              Attendance Trends
            </Typography>
            <Box style={{ width: '100%', height: '400px' }}>
              <Line data={attendanceData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              Average Grades per Subject
            </Typography>
            <Box style={{ width: '100%', height: '400px' }}>
              <Bar data={averageSubjectData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              CGPA Distribution
            </Typography>
            <Box style={{ maxWidth: '300px', margin: '0 auto' }}>
              <Doughnut data={cgpaData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Students List
      </Typography>
      <List>
        {studentData.map(student => (
          <ListItem key={student._id}>
            <Link to={`/student/${student._id}`}>{student.name}</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Dashboard;
