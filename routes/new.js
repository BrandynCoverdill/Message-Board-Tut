import { Router } from 'express';
import { Message } from '../modules/Message.js';

// Create a new router instance
export const newRouter = new Router();

// Show form view on '/new'
newRouter.get('/', (req, res, next) => {
	res.render('form', { title: 'Add a new Message' });
});

// When the user posts some data on '/new'
newRouter.post('/', async (req, res, next) => {
	// Grab the data from the request
	const data = req.body;

	// Create new record in the database
	try {
		await Message.create({
			text: data.text,
			user: data.user,
		});
	} catch (error) {
		console.error('Unable to add message: ', error);
	}

	// Redirect the user to the index view
	res.redirect('/');
	next();
});
