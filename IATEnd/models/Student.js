import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    enrollmentNumber: { type: String, unique: true, required: true },
    semester: { type: Number, required: true },
    branch: { type: String, required: true }, 
    email : { type: String, unique: true,  required: true },
  });
  
  const attendanceSchema = new mongoose.Schema({
    subject : {type: String, required: true},
    month : {type: String, required: true},
    year : {type: Number, required: true},
    records : [{
      date : { type: String, required: true },
      students: [{
        enrollmentNumber: { type: String, required: true },
        status: { type: String, enum:['Present', 'Absent', 'null'], required: true}
      }]
    }]
  });
  
  attendanceSchema.index({ subject: 1, month: 1, year: 1, 'records.date': 1 }, { unique: true });
  
  
  const Student = mongoose.model('Student', studentSchema);
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  
export {Student, Attendance};
