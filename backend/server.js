const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api', studentRoutes);


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student_grading')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Test Route
app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
