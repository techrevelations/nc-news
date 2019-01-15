const router = require('express').Router();
const { getAllTopics, getAllArticlesByTopic, postTopic } = require('../controllers/topic_controllers');

router.get('/', getAllTopics);
// //router.post('/', postTopic);
router.get('/:topic/articles', getAllArticlesByTopic);

module.exports = router;
