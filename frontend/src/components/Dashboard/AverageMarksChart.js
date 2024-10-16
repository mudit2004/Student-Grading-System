import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const AverageMarksChart = ({ data }) => {
    const subjectAverages = data.reduce((acc, student) => {
        student.subjects.forEach(subject => {
            acc[subject.name] = acc[subject.name] || { total: 0, count: 0 };
            acc[subject.name].total += subject.marks;
            acc[subject.name].count++;
        });
        return acc;
    }, {});

    const barData = {
        labels: Object.keys(subjectAverages),
        datasets: [
            {
                label: 'Average Marks',
                data: Object.values(subjectAverages).map(subj => subj.total / subj.count),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    return (
        <Paper style={{ padding: '24px', height: '350px', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Average Marks per Subject</Typography>
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

export default AverageMarksChart;
