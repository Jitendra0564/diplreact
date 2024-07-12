import { Router } from 'express';
import { authenticateToken  } from '../middleware.js'; 
const router = Router();
import { assignMeeting, deleteMeeting, getMeetings, getNotifications} from '../controllers/meetingcontroller.js';

router.post('/', assignMeeting);
router.get('/', getMeetings);
// Get Notifications
router.get('/notifications', authenticateToken,  getNotifications);
router.delete('/:id', deleteMeeting);

export default router;
