import { Attendance, Student } from '../models/Student.js';

export const storeAttendance = async (req, res) => {
     try{
        const { subject, date, attendanceRecords} = req.body;

         // Find the attendance record for the given subject and date
         const record = await Attendance.findOne({
            subject,
            'records.date': date,   
         });
          if ( record) {
            const recordIndex = record.records.findIndex(
                r => r.date === date);
                if(recordIndex > -1) {
                    record.records[recordIndex].students = attendanceRecords;
                    await record.save();
                }
          }
          res.status(404).json({message: 'Record not found'});
          
     }
        catch(error) {
            console.error("Error updating attendance record: ", error);
            res.status(500).json({message: error.message});
        }

    } 
