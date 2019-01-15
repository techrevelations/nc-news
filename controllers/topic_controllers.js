const connection = require('../db/connection');

exports.getAllTopics = (req, res, next) => {
	const { offset = 0, limit = 10 } = req.query;
	connection
		.select('*')
		.from('topics')
		.limit(limit)
		.offset(offset)
		.orderBy('slug', req.query.order)
		.then((topics) => res.status(200).send({ topics }))
		.catch(next);
};

exports.getAllArticlesByTopic = (req, res, next) => {
	const { p = 0, limit = 10, sort_by = 'articles.created_at' } = req.query;
	const { topic } = req.params;
	const articleQuery = connection
		.select('articles.username', 'title', 'articles.article_id', 'articles.votes', 'articles.created_at', 'topic')
		.from('articles')
		.where('topic', topic)
		.leftJoin('comments', 'comments.article_id', 'articles.article_id')
		.limit(limit)
		.count('comments.comment_id as comment_count')
		.groupBy('articles.article_id', 'articles.username')
		.orderBy(sort_by)
		.offset(p);
	//.map(article);

	const topicQuery = connection.select('*').from('topics').where('slug', topic);
	Promise.all([ articleQuery, topicQuery ])
		.then(([ articles, topics ]) => {
			if (topics.length === 0) return Promise.reject({ status: 404, message: 'topic does not exist' });
			res.status(200).send({ articles });
		})
		.catch(next);
};

// exports.postTopic = (req, res, next) => {
// 	connection
// 		.one(
// 			req.body
// 		)
// 		.then((//WHAT GOES HERE) => {
// 			res.status(201).json({//GOES HERE});
// 		})
// 		.catch(next);
