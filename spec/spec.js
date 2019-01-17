process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
	beforeEach(() =>
		connection.migrate.rollback().then(() => connection.migrate.latest()).then(() => connection.seed.run())
	);

	after(() => connection.destroy());

	describe('/topics', () => {
		it('GET returns status 200 responds with all topics', () =>
			request.get('/api/topics').expect(200).then(({ body }) => {
				expect(body.topics.length).to.equal(3);
				expect(body.topics[0].slug).to.equal('coding');
			}));
		it('POST returns 201 responds with a posted topic', () => {
			const newTopicPost = {
				slug: 'Drop Database',
				description: 'How to hack anything'
			};
			return request.post('/api/topics').send(newTopicPost).expect(201).then(({ body }) => {
				expect(body.topic).to.have.keys('slug', 'description');
				expect(body.topic.slug).to.equal('Drop Database');
				expect(body.topic.description).to.equal('How to hack anything');
			});
		});
		it('POST returns 422 responds with an error message when posting an existing topic', () => {
			const existingTopicPost = {
				slug: 'coding',
				description: 'Code is love, code is life'
			};
			return request.post('/api/topics').send(existingTopicPost).expect(422).then(({ body }) => {
				expect(body.message).to.equal('parameter already exists, duplicates not allowed');
			});
		});
		describe('/:topic/articles', () => {
			it('GET returns status 200 responds with articles from a single topic', () =>
				request.get('/api/topics/coding/articles').expect(200));
			it('GET returns status 404 responds with error message: route does not exist', () =>
				request.get('/api/topics/bitcoin/articles').expect(404).then(({ body }) => {
					expect(body.message).to.equal('topic does not exist');
				}));
			it('GET returns status 200 responds with limited number of results', () =>
				request.get('/api/topics/coding/articles/?limit=5').expect(200).then(({ body }) => {
					expect(body.articles[0].title).to.equal(
						'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals'
					);
					expect(body.articles.length).to.equal(5);
				}));
			it('GET returns status 200 responds with asorted data descending', () =>
				request.get('/api/topics/coding/articles?sort_by=comment_count').expect(200).then(({ body }) => {
					expect(body.articles[0].comment_count).to.equal('11');
					expect(body.articles[9].comment_count).to.equal('6');
				}));
			it('GET returns status 200 responds with limited number of offset results', () =>
				request.get('/api/topics/coding/articles/?limit=2&p=4').expect(200).then(({ body }) => {
					expect(body.articles[0].title).to.equal(
						'Learn HTML5, CSS3, and Responsive WebSite Design in One Go'
					);
					expect(body.articles.length).to.equal(2);
				}));
			it('GET returns status 200 responds with an ordered set of results', () =>
				request.get('/api/topics/coding/articles/?order=asc').expect(200).then(({ body }) => {
					expect(body.articles[0].title).to.equal('Express.js: A Server-Side JavaScript Framework');
					expect(body.articles.length).to.equal(10);
				}));
		});
		it('POST returns 201 responds with a posted article', () => {
			const newArticlePost = {
				title: 'dieting for dummies',
				body: 'how to survive on only jelly, how to remove the wobble',
				username: 'jessjelly'
			};
			return request.post('/api/topics/coding/articles').send(newArticlePost).expect(201).then(({ body }) => {
				// console.log(body);
				expect(body.articles).to.have.keys(
					'article_id',
					'title',
					'body',
					'votes',
					'topic',
					'username',
					'created_at'
				);
				expect(body.articles.topic).to.equal('coding');
				expect(body.articles.body).to.equal('how to survive on only jelly, how to remove the wobble');
			});
		});
		it('POST returns 404 responds with an error if no topic for article is found', () => {
			const newArticlePost = {
				title: 'dieting for dummies',
				body: 'how to survive on only jelly, how to remove the wobble',
				username: 'jessjelly'
			};
			return request.post('/api/topics/no_topic/articles').send(newArticlePost).expect(404).then(({ body }) => {
				expect(body.message).to.equal(
					'insert into "articles" ("body", "title", "topic", "username") values ($1, $2, $3, $4) returning * - insert or update on table "articles" violates foreign key constraint "articles_topic_foreign"'
				);
			});
		});
	});
	describe('/articles', () => {
		it('GET returns status 200 responds with all articles', () =>
			request.get('/api/articles').expect(200).then(({ body }) => {
				expect(body.articles.length).to.equal(10);
				expect(body.articles[0].title).to.equal('Seafood substitutions are increasing');
				expect(body.articles[0]).to.have.keys(
					'author',
					'title',
					'article_id',
					'body',
					'votes',
					'comment_count',
					'created_at',
					'topic'
				);
			}));
		it('GET returns status 200 responds with asorted data by author', () =>
			request.get('/api/articles?sort_by=author').expect(200).then(({ body }) => {
				expect(body.articles[0].author).to.equal('weegembump');
				expect(body.articles[9].author).to.equal('tickle122');
			}));
		it('GET returns status 200 responds with an ordered set of results', () =>
			request.get('/api/articles/?order=asc').expect(200).then(({ body }) => {
				expect(body.articles[0].author).to.equal('cooljmessy');
				expect(body.articles[9].author).to.equal('cooljmessy');
			}));
		describe('/:article_id', () => {
			it('GET returns status 200 responds with an article matching params', () =>
				request.get('/api/articles/35').expect(200).then(({ body }) => {
					expect(body.article[0].article_id).to.equal(35);
				}));
			it('PATCH returns status 200 responds with an ammended article', () => {
				const articlePatch = {
					inc_votes: 10
				};
				return request.patch('/api/articles/35').send(articlePatch).expect(200).then(({ body }) => {
					expect(body.article[0].votes).to.equal(10);
				});
			});
			it('DELETE returns status 204 responds with no content', () => {
				return request
					.delete('/api/mps/3')
					.expect(204)
					.then(({ body }) => {
						expect(body).to.equal({});
						return connection('mps').where('mp_id', 3);
					})
					.then(([ mp ]) => {
						expect(mp).to.equal(undefined);
					});
			});
		});
	});
});

// it('PATCH status 405 handles invalid requests', () => {
// return request.patch('/api/topics').expect(405);
// })

// 'invalidmethods status 405 handles invalid requests, ()=> {const invlaidMethods.map(invalidMethods = ['patch, 'put', 'delete']
// const invalidRequests = invalidmethods.map(invalidMethod => request[invalidMethod](partyUrl).expect(405))
// return Promise.all(invalidRequests))}
