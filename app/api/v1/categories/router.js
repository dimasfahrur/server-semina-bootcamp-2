const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.post('/categories', create);
router.get('/categories', index);
router.get('/categories/:id', find);
router.delete('/categories/:id', destroy);
router.put('/categories/:id', update)

module.exports = router;