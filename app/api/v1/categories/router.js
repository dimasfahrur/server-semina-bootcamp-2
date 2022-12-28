const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/categories', authenticateUser, authorizeRoles('organizer'), create);
router.get('/categories', authenticateUser, authorizeRoles('organizer'), index);
router.get('/categories/:id', authenticateUser, authorizeRoles('organizer'), find);
router.delete('/categories/:id', authenticateUser, authorizeRoles('organizer'), destroy);
router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update)

module.exports = router;