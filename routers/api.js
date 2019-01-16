const router = require('express').Router();
const topicsRouter = require('../routers/topics');
// const articlesRouter = require('../routers / articles');
const { handle405 } = require('../errors/index');

router.use('/topics', topicsRouter);
// router.use('/articles', articlesRouter);

// router.use(handle405);

module.exports = router;
