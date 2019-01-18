const connection = require('../db/connection');

exports.getAllArticles = (req, res, next) => {
  const validSortCriteria = ['votes', 'created_at', 'topic', 'comment_count', 'author'];
  const {
    p = 0, limit = 10, sort_by = 'articles.created_at', order = 'desc',
  } = req.query;
  const sort = validSortCriteria.includes(sort_by) ? sort_by : 'articles.created_at';
  const offset = p === 0 ? 0 : (p - 1) * limit;
  connection
    .select(
      'articles.username as author',
      'articles.title',
      'articles.article_id',
      'articles.body',
      'articles.votes',
      'articles.created_at',
      'articles.topic',
    )
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .limit(limit)
    .offset(offset)
    .groupBy('articles.article_id', 'articles.username')
    .orderBy(sort, order)
    .count('comments.comment_id as comment_count')
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  connection
    .select(
      'articles.article_id',
      'articles.username as author',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.created_at',
      'articles.topic',
    )
    .from('articles')
    .where('articles.article_id', article_id)
    .groupBy('articles.article_id', 'articles.title')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .count('comments.comment_id as comment_count')
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  connection
    .select(
      'articles.article_id',
      'articles.username as author',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.created_at',
      'articles.topic',
    )
    .from('articles')
    .where('articles.article_id', article_id)
    .groupBy('articles.article_id', 'articles.title')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .count('comments.comment_id as comment_count')
    .increment('votes', votes)
    .returning('*')
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  connection
    .select(
      'articles.article_id',
      'articles.username as author',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.created_at',
      'articles.topic',
    )
    .from('articles')
    .where('articles.article_id', article_id)
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .count('comments.comment_id as comment_count')
    .del()
    .then(() => res.status(204).send({}))
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const validSortCriteria = ['votes', 'created_at', 'comment_id', 'body', 'author'];
  const {
    p = 0, limit = 10, sort_by = 'created_at', order = 'desc',
  } = req.query;
  const sort = validSortCriteria.includes(sort_by) ? sort_by : 'created_at';
  const offset = p === 0 ? 0 : (p - 1) * limit;
  const { article_id } = req.params;
  connection
    .select('comment_id', 'username as author', 'body', 'votes', 'created_at')
    .from('comments')
    .where('comments.article_id', article_id)
    .limit(limit)
    .offset(offset)
    .orderBy(sort, order)
    .then(comments => res.status(200).send({ comments }))
    .catch(next);
};

exports.postCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = { article_id, ...req.body };
  connection('comments')
    .insert(newComment)
    .where('article_id', article_id)
    .returning('*')
    .then(([comment]) => {
      // if (!articles) return Promise.reject({ status: 404, message: 'topic does not exist' });
      // console.log(articles);
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { article_id, comment_id } = req.params;
  const votes = req.body.inc_votes;
  connection
    .select('*')
    .from('comments')
    .where({ comment_id, article_id })
    .increment('votes', votes)
    .returning('*')
  // if (article.length === 0) return Promise.reject()
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { article_id, comment_id } = req.params;
  connection
    .select('*')
    .from('comments')
    .where({ comment_id, article_id })
    .del()
    .then(() => res.status(204).send({}))
    .catch(next);
};
