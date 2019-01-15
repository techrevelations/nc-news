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
		describe('/:topic/articles', () => {
			it('GET returns status 200 responds with articles from a single topic', () =>
				request.get('/api/topics/coding/articles').expect(200));
			it('GET returns status 404 responds with error message: route does not exist', () =>
				request.get('/api/topics/bitcoin/articles').expect(404).then(({ body }) => {
					expect(body.message).to.equal('topic does not exist');
				}));
			it('GET returns status 200 responds with limited number of results', () => {
				return request.get('/api/topics/coding/articles/?limit=5').expect(200).then(({ body }) => {
					expect(body.articles[0].title).to.equal('Express.js: A Server-Side JavaScript Framework');
					expect(body.articles.length).to.equal(5);
				});
			});
			it('GET returns status 200 responds with asorted data descending', () => {
				return request.get('/api/topics/coding/articles?sort_by=comment_count').expect(200).then(({ body }) => {
					console.log(body);
					expect(body.articles[0].comment_count).to.equal('5');
					expect(body.articles[9].comment_count).to.equal('9');
				});
			});
		});
	});
});
