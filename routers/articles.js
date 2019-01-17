const router = require('express').Router();
const { getAllArticles, getArticleById } = require('../controllers/articles_controllers');

const { handle405 } = require('../errors/index');

router.get('/', getAllArticles);
router.get('/:article_id', getArticleById);

router.all(handle405);

module.exports = router;
