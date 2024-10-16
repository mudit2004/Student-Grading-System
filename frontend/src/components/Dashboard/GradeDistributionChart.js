import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const GradeDistributionChart = ({ data }) => {
    const countStudentsByGrade = () => {
        const gradeCounts = { A: 0, B: 0, C: 0, D: 0 };
        data.forEach(student => {
            if (student.grade) {
                gradeCounts[student.grade]++;
            }
        });
        return gradeCounts;
    };

    const gradeCounts = countStudentsByGrade();

    const pieData = {
        labels: ['Grade A', 'Grade B', 'Grade C', 'Grade D'],
        datasets: [
            {
                data: [gradeCounts.A, gradeCounts.B, gradeCounts.C, gradeCounts.D],
                backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
            },
        ],
    };

    return (
        <Paper style={{ padding: '24px', height: '350px', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Grade Distribution</Typography>
            <Pie
                data={pieData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: { top: 10, bottom: 20, left: 10, right: 10 } },
                }}
            />
        </Paper>
    );
};

export default GradeDistributionChart;
