import express from 'express';
import { storeAttendance} from '../controllers/storeAttendance.js';

const router = express.Router();

router.post('/storeAttendance', storeAttendance);

export default router;