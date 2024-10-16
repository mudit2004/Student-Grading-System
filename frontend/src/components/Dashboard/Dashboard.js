import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Grid, Button } from '@mui/material';
import { exportToExcel, handleImport } from '../utils/importExportUtils';
import CGPAChart from './CGPAChart';
import GradeDistributionChart from './GradeDistributionChart';
import AttendanceChart from './AttendanceChart';
import CGPARangesChart from './CGPARangesChart';
import AverageMarksChart from './AverageMarksChart';
import StudentList from './StudentList';
import axios from 'axios';
import {Chart,CategoryScale,LinearScale,BarElement,Title,ArcElement,Legend,TimeScale,LineElement,PointElement,} from 'chart.js';

  // Register the required components
  Chart.register(CategoryScale,LinearScale,BarElement,Title,ArcElement,Legend,TimeScale,LineElement,PointElement);

function Dashboard() {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:3001/api/students');
                setStudentData(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Failed to fetch student data.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudentData();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <Button variant="contained" color="primary" onClick={() => exportToExcel(studentData)}>
                    Export to Excel
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleImport(file)}>
                    Import Data
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <CGPAChart data={studentData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <GradeDistributionChart data={studentData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <AttendanceChart data={studentData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <CGPARangesChart data={studentData} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <AverageMarksChart data={studentData} />
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom style={{ marginTop: '24px' }}>Students List</Typography>
            <StudentList students={studentData} />
        </Container>
    );
}

export default Dashboard;
