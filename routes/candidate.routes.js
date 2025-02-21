const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate.model.js')
const { jwtAuthMiddleware } =require( '../middlewares/auth.js');
const { candidateProfile, candidateRegister, updateCandidate, deleteCandidate, voting, voteCount } = require('../controllers/candidate.controller.js');


router.post('/profile',jwtAuthMiddleware,candidateProfile)
router.post('/register',jwtAuthMiddleware,candidateRegister)
router.put('/update/:id',jwtAuthMiddleware,updateCandidate)
router.delete('/delete/:id',jwtAuthMiddleware,deleteCandidate)
router.post('/vote/:id',jwtAuthMiddleware,voting)
router.post('/votecount',voteCount)
module.exports = router;