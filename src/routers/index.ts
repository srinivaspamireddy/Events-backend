import { Router } from 'express';
import eventsRouter from './events/events';

const router = Router();
router.use(['/events'], eventsRouter);

export default router;
