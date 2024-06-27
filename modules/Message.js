import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Message = sequelize.define('Message', {
	text: {
		type: DataTypes.TEXT,
	},
	user: {
		type: DataTypes.TEXT,
	},
	added: {
		type: DataTypes.DATE,
		defaultValue: new Date(),
	},
});
