exports.handle404 = (err, req, res, next) => {
  const errCodes404 = ['23503'];
  console.log(err.message);
  if (err.status === 404 || errCodes404.includes(err.code)) res.status(404).send({ message: err.message || 'parameter does not exist' });
  else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405);
};
exports.handle422 = (err, req, res, next) => {
  const errCodes422 = ['23505'];
  if (errCodes422.includes(err.code)) res.status(422).send({ message: 'parameter already exists, duplicates not allowed' });
  else next(err);
};
