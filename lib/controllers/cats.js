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
  });
