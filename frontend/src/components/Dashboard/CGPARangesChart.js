import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const CGPARangesChart = ({ data }) => {
    const cgpaData = {
        labels: ['Below 5', '5-7', '7-9', '9-10'],
        datasets: [
            {
                data: [
                    data.filter(student => student.cgpa < 5).length,
                    data.filter(student => student.cgpa >= 5 && student.cgpa < 7).length,
                    data.filter(student => student.cgpa >= 7 && student.cgpa < 9).length,
                    data.filter(student => student.cgpa >= 9).length,
                ],
                backgroundColor: ['#FF6347', '#FFA500', '#32CD32', '#4682B4'],
            },
        ],
    };

    return (
        <Paper style={{ padding: '24px', height: '350px', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>CGPA Ranges</Typography>
            <Doughnut
                data={cgpaData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { top: 10, bottom: 20, left: 10, right: 10 } },
                }}
            />
        </Paper>
    );
};

export default CGPARangesChart;
