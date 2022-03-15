const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('AnyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      name: 'Arls',
      owner: 'Alyssa',
      age: 7,
      favoriteToy: 'rubber-band',
    };
  
    const res = await request(app) //what is request(app)? like client
      .post('/api/v1/cats')
      .send(expected);
  
    expect(res.body).toEqual({ id: expected.any(String), ...expected });

  });

});
