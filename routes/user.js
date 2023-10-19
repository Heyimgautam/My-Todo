const express = require('express')
const {register,login,getMyProfile,logOut} = require('../controllers/user.js')
const isAuthenticated = require('../middleware/auth')

const router = express.Router();


router.post('/new',register);
router.post('/login',login);
router.get('/me',isAuthenticated,getMyProfile)
router.get('/logout',logOut);


module.exports = router;
