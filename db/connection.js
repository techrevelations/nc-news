const ENV = process.env.NODE_ENV || 'development';
// if not set, default to development
// required in config

const config =
	ENV === 'production' ? {client: 'pg', connection: process.env.DATABASE_URL} : require('../knexfile')[ENV];

module.exports = require('knex')(config);
