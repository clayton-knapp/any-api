const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

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
      favoriteToy: 'rubberband',
    };
  
    const res = await request(app) //what is request(app)? like client
      .post('/api/v1/cats')
      .send(expected);
  
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
    
  });


  it('gets list of cats', async () => {
    const expected = await Cat.fetchAll();
    
    const res = await request(app) //what is request(app)
      .get('/api/v1/cats');
    
    expect(res.body).toEqual(expected);
  });


  // it('gets a single of cat', async () => {
  //   const expected = await Cat.fetchById(id);
    
  //   const res = await request(app) //what is request(app)
  //     .get('/api/v1/cats');
    
  //   expect(res.body).toEqual(expected);
  // });







});
