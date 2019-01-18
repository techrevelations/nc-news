const connection = require('../db/connection');

exports.getAllUsers = (req, res, next) => {
  connection.select('*').from('users').then(users => res.status(200).send({ users })).catch(next);
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  connection
    .select('*')
    .from('users')
    .where('username', username)
    .then(users => res.status(200).send({ users }))
    .catch(next);
};
