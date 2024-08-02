// routes/loginUser.js
import express from 'express';
import { loginUser } from '../controllers/loginController.js';

const router = express.Router();

// Define the POST route for login
router.post('/', loginUser);

export default router;
