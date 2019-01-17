const connection = require('../db/connection');

exports.getAllArticles = (req, res, next) => {
	const validSortCriteria = [ 'votes', 'created_at', 'topic', 'comment_count', 'author' ];
	const { p = 0, limit = 10, sort_by = 'articles.created_at', order = 'desc' } = req.query;
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
			'articles.topic'
		)
		.from('articles')
		.leftJoin('comments', 'comments.article_id', 'articles.article_id')
		.limit(limit)
		.offset(offset)
		.groupBy('articles.article_id', 'articles.username')
		.orderBy(sort, order)
		.count('comments.comment_id as comment_count')
		.then((articles) => res.status(200).send({ articles }))
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
			'articles.topic'
		)
		.from('articles')
		.where('articles.article_id', article_id)
		.groupBy('articles.article_id', 'articles.title')
		.leftJoin('comments', 'comments.article_id', 'articles.article_id')
		.count('comments.comment_id as comment_count')
		.then((article) => res.status(200).send({ article }))
		.catch(next);
};

exports.patchArticleById = (req, res, next) => {
	console.log(req.body);
};
