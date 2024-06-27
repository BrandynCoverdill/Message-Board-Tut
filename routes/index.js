import { Router } from 'express';
import { Message } from '../modules/Message.js';

// Create a new router instance
export const indexRouter = new Router();

indexRouter.get('/', async (req, res, next) => {
	try {
		// Grab all message records from the database
		const messages = await Message.findAll();

		// Render the view 'index' and pass in an object that will inject
		// those values into the HTML document
		res.render('index', { title: 'Message Board', messages: messages });
	} catch (error) {
		console.error('Failed to retrieve messages: ', error);
		res.status(500).send('Error retrieving messages.');
	}
});
