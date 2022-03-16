const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()

//POST /api/v1/cats
  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    // console.log('req.body', req.body);
    // console.log('cat', cat);
    res.send(cat);
  })

//GET all /api/v1/cats
  .get('/', async (req, res) => {
    const cats = await Cat.fetchAll();
    res.send(cats);
  })


//GET by ID /api/v1/cats
  .get('/:id', async (req, res, next) => {
    try {
      const cats = await Cat.fetchById(req.params.id);
      res.send(cats);
    }
    catch (error) {
      error.status = 404;
      next(error);
    }
  })


//DELETE by ID /api/v1/cats

  .delete('/:id', async (req, res) => {
    const cat = await Cat.deleteById(req.params.id);
    res.send(cat);
    
  })


//UPDATE by ID /api/v1/cats

  .patch('/:id', async (req, res) => {
    const cat = await Cat.updateById(req.params.id, req.body);
    res.send(cat);
    
  });
