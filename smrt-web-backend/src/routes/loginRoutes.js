const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication');
const userController = require('../controllers/userController');

router.post('/residentLogin', userController.residentLogin); //TODO
router.post('/adminLogin', userController.adminLogin); //TODO





