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
	const { offset = 0, limit = 10 } = req.query;
	const { topic } = req.params;
	connection
		.select('*')
		.from('articles')
		.where(topic === 'article_id')
		.then((articles) => res.status(200).send({ articles }))
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
