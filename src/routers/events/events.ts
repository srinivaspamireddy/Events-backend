import { Router } from 'express';
import { eventsFromApiController } from '../../controllers/events/eventsFromApi';
import { eventList, eventSingleList } from '../../controllers/events/eventScrapController';

const eventsRouter = Router();
eventsRouter.post('/api/location', eventsFromApiController);
eventsRouter.get('/eventList', eventList);
eventsRouter.get('/event/:id', eventSingleList);
export default eventsRouter;