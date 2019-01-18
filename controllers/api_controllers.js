const endPoints = require('../db/data/endPoints');

function getAllEndpoints(req, res, next) {
  res.status(200).send({ endPoints }).catch(next);
}
module.exports = getAllEndpoints;
