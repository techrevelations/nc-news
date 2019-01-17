const router = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users_controllers');
const { handle405 } = require('../errors/index');

router.get('/', getAllUsers);
router.get('/:username', getUser);

module.exports = router;
