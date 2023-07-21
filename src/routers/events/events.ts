import { Router } from 'express';
import { eventsFromApiController } from '../../controllers/events/eventsFromApi';

const eventsRouter = Router();
eventsRouter.post('/api/location', eventsFromApiController);

export default eventsRouter;