const router = require('express').Router();
const topicsRouter = require('../routers/topics');
const articlesRouter = require('../routers/articles');

router.use('/topics', topicsRouter);
// router.use('/articles', articlesRouter);

module.exports = router;
