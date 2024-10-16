import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const CGPAChart = ({ data }) => {
    const barData = {
        labels: data.map(student => student.name || 'Unnamed'),
        datasets: [
            {
                label: 'CGPA',
                data: data.map(student => student.cgpa || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <Paper style={{ padding: '24px', height: '350px', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>CGPA Distribution</Typography>
            <Bar
                data={barData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { top: 10, bottom: 20, left: 10, right: 10 } },
                }}
            />
        </Paper>
    );
};

export default CGPAChart;
