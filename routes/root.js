const express = require('express');
const router = express.Router();
let projectName = process.env.PROJECT;
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../config/authenticationChecks');

router.get('/', checkNotAuthenticated, (req,res)=>{
  res.render('index', {
    projectName
  });
});

router.get('/dashboard', checkAuthenticated,  (req, res)=>{
  console.log(req.user);
  res.render('dashboard', {
    projectName,
    user: req.user
  });
});



module.exports = router;
