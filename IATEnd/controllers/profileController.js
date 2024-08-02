import { Faculty } from '../models/User.js';
import { Student } from '../models/Student.js';

export const getProfile = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let user = await Faculty.findOne({ email });

        if (user) {
            return res.status(200).json({ message: 'Profile fetched successfully', user });
        }

        user = await Student.findOne({ email });

        if (user) {
            return res.status(200).json({ message: 'Profile fetched successfully', user });
        }

        return res.status(404).json({ message: 'User not found' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
