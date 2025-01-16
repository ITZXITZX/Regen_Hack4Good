const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication');
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signout', userController.signout);
router.post('/verifyToken', userController.verifyToken);
router.put('/updateUserInfoById', verifyToken, userController.updateUserInfoById);
router.put('/changeUserPassword', verifyToken, userController.changeUserPassword);
router.get('/allUsers', verifyToken, userController.getAllUsers);

module.exports = router;