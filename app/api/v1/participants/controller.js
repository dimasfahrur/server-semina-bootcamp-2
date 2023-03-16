const {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getAllOrders,
  getOneEvent
} = require('../../../services/mongoose/participants');

const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req)

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });    
  } catch (err) {
    next(err)
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);

    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (err) {
    next(err);
  }
};

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
};


const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);
    
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

module.exports = {
  signup,
  activParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
};