// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for the port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', studentRoutes); // Added '/api' prefix for student routes

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student_grading')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Backend Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
