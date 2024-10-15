// src/App.js
import React from 'react'; // Import React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components for routing
import Navbar from './components/Navbar'; // Import the Navbar component
import AddStudent from './components/AddStudent'; // Import AddStudent component
import StudentList from './components/StudentList'; // Import StudentList component
import UpdateStudent from './components/UpdateStudent'; // Import UpdateStudent component
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import StudentProfile from './components/StudentProfile'; // Import StudentProfile component


function App() {
  return (
    <Router> {/* Wrap the application in Router to enable routing */}
      <Navbar /> {/* Include the Navbar at the top of the application */}
      <div className="container"> {/* Main container for content */}
        <h1 className="text-center my-4">Student Grading System</h1> {/* Application title */}
        <Routes> {/* Define routes for different components */}
          <Route path="/" element={<StudentList />} /> {/* Route for Student List */}
          <Route path="/add" element={<AddStudent />} /> {/* Route for adding a new student */}
          <Route path="/update/:id" element={<UpdateStudent />} /> {/* Route for updating a student */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for the Dashboard */}
          <Route path="/student/:id" element={<StudentProfile />} /> {/* Route for student profile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Export the App component for use in index.js
