// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(400).json({ message: 'Error saving student', error });
  }
});

// Get all students with filtering and sorting
router.get('/students', async (req, res) => {
  try {
    const { name, rollNumber, sortBy, order } = req.query;

    // Create a filter object based on query parameters
    let filter = {};
    if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
    if (rollNumber) filter.rollNumber = rollNumber;

    // Set sorting criteria
    let sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = order === 'desc' ? -1 : 1; // Descending or ascending
    }

    // Fetch students based on the filter and sort criteria
    const students = await Student.find(filter).sort(sortCriteria);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Get student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); // Use 'id' for the parameter
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a student's details
router.put('/students/:id', async (req, res) => {
  try {
    // Retrieve the student document by ID
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update fields as per the request or retain the existing ones
    student.name = req.body.name || student.name;
    student.rollNumber = req.body.rollNumber || student.rollNumber;
    student.dateOfBirth = req.body.dateOfBirth || student.dateOfBirth; // Retain original date of birth
    student.email = req.body.email || student.email;
    student.phone = req.body.phone || student.phone;
    student.subjects = req.body.subjects || student.subjects;

    // Save the student, which will trigger the pre-save middleware to recalculate CGPA, grade, etc.
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Error deleting student' });
    }
  });

module.exports = router;
