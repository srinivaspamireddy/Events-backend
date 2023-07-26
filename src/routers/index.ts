import { Router } from 'express';
import eventsRouter from './events/events';
import authRouter from './auth/auth';

const router = Router();
router.use(['/events'], eventsRouter);
router.use(['/auth'], authRouter);

export default router;
