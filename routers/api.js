const router = require('express').Router();
const topicsRouter = require('../routers/topics');
const articlesRouter = require('../routers/articles');
const usersRouter = require('../routers/users');
const { handle405 } = require('../errors/index');
const getAllEndpoints = require('../controllers/api_controllers');

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);

router.get('/', getAllEndpoints);

router.use(handle405);

module.exports = router;
