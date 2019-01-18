const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api');
const {handle404, handle422} = require('./errors');

app.use(bodyParser.json());

app.use('/api', apiRouter);

// app.use(handle400);
app.use(handle404);
app.use(handle422);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({err});
});

module.exports = app;
