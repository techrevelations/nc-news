exports.handle404 = (err, req, res, next) => {
	res.status(404).send({ mesage: err.message });
};
