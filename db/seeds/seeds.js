const {
  topicData, userData, articleData, commentData,
} = require('../data/development-data/index');

const { arrangeArticles, arrangeComments } = require('../utils/index');

exports.seed = function (knex, Promise) {
  return knex('topics')
    .insert(topicData)
    .returning('*')
    .then(() => knex('users').insert(userData).returning('*'))
    .then(() => {
      const articlesArray = arrangeArticles(articleData);
      return knex('articles').insert(articlesArray).returning('*');
    })
    .then((articles) => {
      const commentArray = arrangeComments(commentData, articles);
      return knex('comments').insert(commentArray).returning('*');
    });
};
