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
router.post('/create-task', userController.createTask);
router.get('/get-tasks', userController.getTasks);
router.get('/get-tasks', userController.getTasks);
router.post('/cancel-task/:taskName', userController.cancelTask);
router.post('/approve-task/:taskName', userController.approveTask);


module.exports = router;