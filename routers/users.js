
const express = require('express');
const router = express.Router();
const usersController=require('../controllers/usersControllers')

//login
router.post('/reg',usersController.userRegestration);

router.get('/login',usersController.login)

module.exports = router;
