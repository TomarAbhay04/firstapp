import {Faculty} from '../models/User.js';
import { Student } from '../models/Student.js';

export const loginUser = async (req, res) => {
    const { email, userType } = req.body;

    if (!email || !userType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let user;

        if (userType === 'faculty') {
            user = await Faculty.findOne({ email });
            if (user) {
                return res.status(200).json({ message: 'Login successful', user });
            } else {
                return res.status(401).json({ message: 'Faculty email not found' });
            }
        } 
         if (userType === 'student') {
            user = await Student.findOne({ email });
            if (user) {
                return res.status(200).json({ message: 'Login successful', user });
            } else {
                return res.status(401).json({ message: 'Student email not found' });
            }
        } 
        return res.status(401).json({ message: 'User type not recognized' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};;
