const express = require('express');
const router = express();
const { create, index, find} = require('./controller');

router.post('/categories', create);
router.get('/categories', index);
router.get('/categories/:id', find);

module.exports = router;