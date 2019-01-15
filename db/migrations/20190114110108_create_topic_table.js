exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', (topicTable) => {
    topicTable.string('slug').primary().unique();
    topicTable.string('description');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
