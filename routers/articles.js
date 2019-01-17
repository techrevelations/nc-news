const router = require('express').Router();
const {
	getAllArticles,
	getArticleById,
	patchArticleById,
	deleteArticleById,
	getCommentsByArticleId,
	postCommentToArticle,
	patchCommentById,
	deleteComment
} = require('../controllers/articles_controllers');
const { handle405 } = require('../errors/index');

router.get('/', getAllArticles);
router.get('/:article_id', getArticleById);
router.patch('/:article_id', patchArticleById);
router.delete('/:article_id', deleteArticleById);
router.get('/:article_id/comments', getCommentsByArticleId);
router.post('/:article_id/comments', postCommentToArticle);
router.patch('/:article_id/comments/:comment_id', patchCommentById);
router.delete('/:article_id/comments/:comment_id', deleteComment);

router.all(handle405);

module.exports = router;
