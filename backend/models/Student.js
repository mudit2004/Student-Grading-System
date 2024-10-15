// backend/models/Student.js
const mongoose = require('mongoose');

// Define the Student schema
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subjects: [
    {
      name: { type: String, required: true }, // Subject Name
      marks: { type: Number, required: true, min: 0, max: 100 }, // Marks Obtained (0-100)
      hoursAttended: { type: Number, required: true, min: 0, max: 100 }, // Hours Attended (0-100)
    },
  ],
  cgpa: { type: Number },
  grade: { type: String },
  attendancePercentage: { type: Number }, // Overall Attendance Percentage
});

// Middleware to automatically calculate CGPA, attendance percentage, and assign grade before saving
StudentSchema.pre('save', function (next) {
  const totalMarks = this.subjects.reduce((acc, subject) => acc + subject.marks, 0);
  const totalSubjects = this.subjects.length;

  // Calculate CGPA
  this.cgpa = totalSubjects > 0 ? (totalMarks / (totalSubjects * 100)) * 10 : 0;

  // Calculate attendance percentage
  const totalHoursAttended = this.subjects.reduce((acc, subject) => acc + subject.hoursAttended, 0);
  this.attendancePercentage = totalSubjects > 0 ? (totalHoursAttended / (totalSubjects * 100)) * 100 : 0;

  // Assign a grade based on CGPA
  if (this.cgpa >= 9) {
    this.grade = 'A';
  } else if (this.cgpa >= 7) {
    this.grade = 'B';
  } else if (this.cgpa >= 5) {
    this.grade = 'C';
  } else {
    this.grade = 'D';
  }

  next();
});

// Export the Student model
module.exports = mongoose.model('Student', StudentSchema);
