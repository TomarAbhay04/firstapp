import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Student, Attendance } from '../models/Student.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' }); // Adjust the path as necessary

// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MONGODB_URI is not defined in the environment variables.');
}

// Connect to MongoDB
await mongoose.connect(mongoURI)
.then(() => {
  console.log("Database connected");
})
.catch((err) => {
  console.error('Error connecting to the database:', err);
});

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate student data
const generateStudents = () => {
  const students = [];
  for (let i = 1; i <= 60; i++) {
    const enrollmentNumber = `2112501160${i.toString().padStart(2, '0')}`; // Correct format
    const name = `Student ${i}`;
    const email = `${name.toLowerCase().replace(/ /g, '')}${enrollmentNumber.slice(-5)}@gmail.com`; // Adjust email as needed
    students.push({
      name,
      enrollmentNumber,
      semester: 7,
      branch: 'IT',
      email
    });
  }
  return students;
};

// Generate attendance data
const generateAttendance = (students) => {
  // Updated subjects
  const subjects = ['AML', 'WC', 'IOT', 'AD', 'SPM', 'CV'];
  
  // Months from July to November
  const months = [
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 }
  ];
  
  const year = new Date().getFullYear();
  const attendanceRecords = [];

  // Generate records for each subject and month
  subjects.forEach(subject => {
    months.forEach(month => {
      for (let day = 1; day <= month.days; day++) {
        const dateString = `${month.name} ${day}, ${year}`;
        attendanceRecords.push({
          subject,
          month: month.name,
          year,
          records: [
            {
              date: dateString,
              students: students.map(student => ({
                enrollmentNumber: student.enrollmentNumber,
                status: 'null' // Initial status is 'null'
              }))
            }
          ]
        });
      }
    });
  });

  return attendanceRecords;
};



// Save data to local files
const saveDataToLocalFiles = (students, attendance) => {
  try {
    // Save student data to local file
    fs.writeFileSync(path.join(__dirname, 'students.json'), JSON.stringify(students, null, 2));

    // Save attendance data to local file
    fs.writeFileSync(path.join(__dirname, 'attendance.json'), JSON.stringify(attendance, null, 2));

    console.log('Data saved to local files successfully.');
  } catch (error) {
    console.error('Error saving data to local files:', error);
  }
};

// Save data to MongoDB collections
const saveDataToDB = async (students, attendance) => {
  try {
    // Clear existing data
    await Student.deleteMany({});
    await Attendance.deleteMany({});

    // Save student data to the database
    await Student.insertMany(students);
    console.log('Students data inserted into database successfully.');

    // Save attendance data to the database
    await Attendance.insertMany(attendance);
    console.log('Attendance data inserted into database successfully.');
  } catch (error) {
    console.error('Error inserting data into database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Run the script
const run = async () => {
  const students = generateStudents();
  const attendance = generateAttendance(students);

  // Print to verify
  // console.log('Generated Students:', students);
  // console.log('Generated Attendance:', attendance);

  // Save to local files
  saveDataToLocalFiles(students, attendance);

  // Save to database
  await saveDataToDB(students, attendance);
};

run();
