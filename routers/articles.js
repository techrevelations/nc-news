const router = require('express').Router();
const { getAllArticles, getArticleById, patchArticleById } = require('../controllers/articles_controllers');

const { handle405 } = require('../errors/index');

router.get('/', getAllArticles);
router.get('/:article_id', getArticleById);
router.patch('/:article_id', patchArticleById);

router.all(handle405);

module.exports = router;
