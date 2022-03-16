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


  it('gets a single of cat', async () => {
    const expected = await Cat.fetchById(1);
    
    const res = await request(app) //what is request(app)
      .get(`/api/v1/cats/${expected.id}`);
    
    expect(res.body).toEqual(expected);
  });

  // it('returns a 404 if cat not found', async() => {
  //   const res = await request(app)
  //     .get('/api/v1/cats/dont-exist');

  //   expect (res.status).toEqual(404);

  // });


  it('deletes a cat by id', async() => {
    const expected = await Cat.fetchById(1);
    const res = await request(app)
      .delete(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });


  it('updates a cat by ID', async () => {
    const expected = {
      id: expect.any(String),
      name: 'OLD Sterling',
      owner: 'Clayton',
      age: 14,
      favoriteToy: 'feather',
    };
    
    const res = await request(app) 
      .patch('/api/v1/cats/1')
      .send({ name: 'OLD Sterling' });
    
    expect(res.body).toEqual(expected);
  });




});
