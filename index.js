import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { sequelize } from './config/database.js';
import { Message } from './modules/Message.js';
import { indexRouter } from './routes/index.js';
import { newRouter } from './routes/new.js';

// Config .env file
dotenv.config();

console.log(process.env.PORT);

// Create instance of Express
const app = express();

// Get the root directory of our application
const __dirname = path.resolve();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Tells express to use the 'json' middleware, which will parse the JSON
// payload of incoming requests and makes it available on 'req.body'
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads, which
// are typically sent from HTML forms.
app.use(express.urlencoded({ extended: true }));

// Add the routes to the express app instance
app.use('/', indexRouter);
app.use('/new', newRouter);

// Function to connect to the database
const authDB = async () => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.error('Could not connect to database: ', error);
	}
};

// Function to sync models to the database
const syncModels = async () => {
	try {
		await sequelize.sync({ alter: true });
	} catch (error) {
		console.error('Could not sync models to the database: ', error);
	}
};

// Function that adds records to the Message table
const addRecordsToMessage = async () => {
	// Populate Message only if there are no existing records
	if ((await Message.count()) > 0) {
		return;
	}
	try {
		await Message.bulkCreate([
			{
				text: 'Hello, World!',
				user: 'User 1',
				added: new Date(),
			},
			{
				text: 'Foobar',
				user: 'User 2',
				added: new Date(),
			},
			{
				text: 'Lorem ipsum',
				user: 'User 3',
				added: new Date(),
			},
		]);
	} catch (error) {
		console.error('Could not add records to Message: ', error);
	}
};

// Function to run the application
const run = async () => {
	await authDB();
	await syncModels();
	await addRecordsToMessage();

	const port = process.env.PORT || 3000;

	app.listen(port, '0.0.0.0', () => {
		console.log('Server is running');
	});
};

run();
