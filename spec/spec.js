process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
	beforeEach(() => {
		return connection.migrate.rollback().then(() => connection.migrate.latest()).then(() => connection.seed.run());
	});

	after(() => connection.destroy());

	describe('/topics', () => {
		it('GET returns status 200 responds with all topics', () => {
			return request.get('/api/topics').expect(200).then(({ body }) => {
				expect(body.topics.length).to.equal(3);
				expect(body.topics[0].slug).to.equal('coding');
			});
		});
		describe('/:topic/articles', () => {
			it('GET returns status 200 responds with articles from a single topic', () => {
				return request.get('/api/topics/coding/articles').expect(200).then(({ body }) => {
					console.log(body);
				});
			});
		});
	});
});
