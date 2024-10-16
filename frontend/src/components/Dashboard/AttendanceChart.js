import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const AttendanceChart = ({ data }) => {
    const lineData = {
        labels: data.map(student => student.name || 'Unnamed'),
        datasets: [
            {
                label: 'Attendance Percentage',
                data: data.map(student => student.attendancePercentage || 0),
                borderColor: 'rgba(255, 99, 132, 0.6)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
            },
        ],
    };

    return (
        <Paper style={{ padding: '24px', height: '350px', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Attendance Trends</Typography>
            <Line
                data={lineData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { top: 10, bottom: 20, left: 10, right: 10 } },
                }}
            />
        </Paper>
    );
};

export default AttendanceChart;
