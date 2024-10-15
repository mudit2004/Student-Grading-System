// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
            Student Grading System
          </Typography>
          <Button component={NavLink} to="/" color="inherit">
            Student List
          </Button>
          <Button component={NavLink} to="/add" color="inherit">
            Add Student
          </Button>
          <Button component={NavLink} to="/dashboard" color="inherit">
            Dashboard
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; // Export the Navbar component for use in other parts of the application
