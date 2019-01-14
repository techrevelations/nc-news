const app = require('express')();
const { getAllReviews, getAllComments } = require('./controllers/comments');

app.get('/api/comments', getAllComments);
//app.get('/api/reviews', getAllReviews);

module.exports = app;
