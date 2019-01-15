exports.up = function(knex, Promise) {
	return knex.schema.createTable('comments', (commentTable) => {
		commentTable.increments('comment_id').primary().unique();
		commentTable.string('username').references('users.username');
		commentTable.integer('article_id').references('articles.article_id');
		commentTable.integer('votes').defaultTo(0);
		commentTable.dateTime('created_at').defaultTo(knex.fn.now());
		commentTable.text('body');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('comments');
};
