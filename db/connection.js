const ENV = process.env.NODE_ENV || 'development';
//if not set, default to development
//required in config
const dbConfig = require('../knexfile.js')[ENV];

const knex = require('knex');
const connection = knex(dbConfig);

module.exports = connection;
