const router = require('express').Router();
const { getAllTopics, getAllArticlesByTopic, postTopic, postArticle } = require('../controllers/topic_controllers');

const { handle405 } = require('../errors/index');

router.get('/', getAllTopics);
router.post('/', postTopic);
router.get('/:topic/articles', getAllArticlesByTopic);
router.post('/:topic/articles', postArticle);
router.all(handle405);

module.exports = router;
