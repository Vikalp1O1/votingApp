const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const {userRegister,userLogin,userProfile} = require("../controllers/user.controller.js")
const { jwtAuthMiddleware } =require( '../middlewares/auth.js');

// registering user

router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/profile',jwtAuthMiddleware,userProfile)


module.exports = router;