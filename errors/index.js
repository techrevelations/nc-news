const errCodes422 = [ 23505 ];

exports.handle404 = (err, req, res, next) => {
	console.log(err);
	res.status(404).send({ message: err.message });
};

exports.handle405 = (req, res, next) => {
	res.status(405);
};
exports.handle422 = (err, req, res, next) => {
	if (errCodes422.includes(err.code)) res.status(422).send({ message: err.message });
};
