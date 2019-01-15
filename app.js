const app = require('express')();
const apiRouter = require('./routers/api');
const { handle400, handle404 } = require('./errors');
const bodyParser = require('body-Parser');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ err });
});

// app.use(handle400);
// app.use(handle404);

module.exports = app;
