import 'dotenv/config';
import { RequestHandler } from 'express';
import axios from 'axios';
import createHttpError from 'http-errors';

export const eventsFromApiController: RequestHandler = async (req, res, next) => {
  try {
    const apiKey = process.env.PREDICTHQ_API_KEY;
    const { startDate, endDate, country, location } = req.body;
    //make request to predictHQ to get events data.
    const eventsResponse = await axios.get(`https://api.predicthq.com/v1/events/?country=${country}&q=${location}&start.gte=${startDate}&start.lte=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
    const eventsData = eventsResponse.data.results;
    
    return res.status(200).json(eventsData);

  } catch (error) {
    console.log('error', error);
    return next(createHttpError.InternalServerError)
  }
};