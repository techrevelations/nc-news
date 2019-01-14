const { topicData, userData } = require('../db/data/development/index');

exports.seed = function(knex, Promise) {
	return knex('topics').insert(topicData).returning('*').then(() => {
		return knex('users').insert(userData).returning('*');
	});
};
