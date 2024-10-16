import React from 'react';
import { Paper, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => (
    <Paper style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <List>
            {students.map(student => (
                <ListItem key={student._id}>
                    <Link to={`/student/${student._id}`}>{student.name}</Link>
                </ListItem>
            ))}
        </List>
    </Paper>
);

export default StudentList;
