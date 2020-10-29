const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const employeeController = require('../controllers/employeeController');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.use('/employees',jwtHelper.verifyJwtToken, employeeController);

module.exports = router;



