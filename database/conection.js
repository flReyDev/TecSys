
const { Sequelize } = require('sequelize');

const dbConection = new Sequelize(process.env.DATABASE || 'tecsys_erp', process.env.DATABASE_USER || 'postgres', process.env.PASSWORD || '123456789', {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		freezeTableName: true
	}
});
module.exports = dbConection;