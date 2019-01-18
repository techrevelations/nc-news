const endPoints = {
	'/api': 'GET responds with a json object of all endpoints',
	'/api/topics': ['GET responds with all topics', 'POST responds with a posted topic'],
	'/api/topics/:topic/articles': 'GET responds with articles from a single topic',
	'/api/articles': 'GET responds with all articles',
	'/api/articls/:article_id': [
		'GET responds with an article matching params',
		'PATCH responds with an ammended article',
		'DELETE permits the deletion of an article'
	],
	'/api/articles/:article_id/comments': [
		'GET responds with comments matching an article_id',
		'POST responds with a posted comment'
	],
	'/api/articles/:articles_id/comments/:comment_id': [
		'PATCH responds with an ammended comment',
		'DELETE permits the deletion of a comment'
	],
	'/api/users': 'GET responds with a list of all users',
	'/api/users/:username': 'GET responds with a single specified user'
};

module.exports = endPoints;
