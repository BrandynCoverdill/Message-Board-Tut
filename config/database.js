import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
	process.env.MYSQLDATABASE,
	process.env.MYSQLUSER,
	process.env.MYSQLPASSWORD,
	{
		host: process.env.MYSQLHOST,
		dialect: 'mysql',
		port: process.env.MYSQLPORT || 3306,
		logging: false,
		define: {
			timestamps: false,
		},
	}
);
