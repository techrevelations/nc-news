const app = require('express')();
const bodyParser = require('body-Parser');
const apiRouter = require('./routers/api');
const { handle400, handle404 } = require('./errors');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(handle404);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ err });
});

// app.use(handle400);

module.exports = app;
