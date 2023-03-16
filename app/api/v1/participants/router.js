const express = require('express');
const router = express();
const {
  signup,
  activParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
} = require('./controller');
const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activParticipant);
router.get('/events', getAllLandingPage);
router.get('/events/:id', getDetailLandingPage);
router.get('/orders', authenticateParticipant, getDashboard);

module.exports = router;