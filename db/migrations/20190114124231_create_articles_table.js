exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articleTable) => {
    articleTable.increments('article_id').primary().unique();
    articleTable.string('title');
    articleTable.text('body');
    articleTable.integer('votes').defaultTo(0);
    articleTable.string('topic').references('topics.slug');
    articleTable.string('username').references('users.username');
    articleTable.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
