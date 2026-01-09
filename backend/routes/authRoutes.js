const express = require('express');
authRouter = express.Router();

//Controller File
const { loginController, signupController } = require('../controllers/authController');


authRouter.post('/login', loginController);
authRouter.post('/signup', signupController);


module.exports = authRouter;