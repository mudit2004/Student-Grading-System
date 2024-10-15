// src/components/StudentList.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [rollNumberFilter, setRollNumberFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/students');
      let fetchedStudents = res.data;

      // Apply filtering
      if (nameFilter) {
        fetchedStudents = fetchedStudents.filter(student =>
          student.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      if (rollNumberFilter) {
        fetchedStudents = fetchedStudents.filter(student =>
          student.rollNumber.toLowerCase().includes(rollNumberFilter.toLowerCase())
        );
      }

      // Apply sorting
      if (sortBy) {
        fetchedStudents.sort((a, b) => {
          if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }

      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [nameFilter, rollNumberFilter, sortBy, order]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>
      <div className="filter-sort-controls" style={{ marginBottom: '20px' }}>
        <TextField
          label="Filter by Name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Filter by Roll Number"
          variant="outlined"
          value={rollNumberFilter}
          onChange={(e) => setRollNumberFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell
                  onClick={() => {
                    setSortBy('cgpa');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  CGPA {sortBy === 'cgpa' ? (order === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSortBy('grade');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Grade {sortBy === 'grade' ? (order === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <Link to={`/student/${student._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {student.name}
                    </Link>
                  </TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.cgpa ? student.cgpa.toFixed(2) : 'N/A'}</TableCell>
                  <TableCell>{student.grade || 'N/A'}</TableCell>
                  <TableCell>
                    <Link to={`/update/${student._id}`}>
                      <Button variant="outlined" color="warning" size="small">
                        Update
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default StudentList;
