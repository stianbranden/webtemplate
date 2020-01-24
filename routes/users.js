const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../config/authenticationChecks');

let projectName = process.env.PROJECT;


router.get('/', checkAuthenticated,  (req,res)=>{
  res.render('users', {
    projectName
  });
});

router.post('/', checkNotAuthenticated, async (req, res)=>{
  let {name, email, password} = req.body;
  console.log(req.body);
  if (password !== req.body.password2){
    req.flash('warning', 'Passwords do not match');
    return res.render('register', {projectName, form: {name, email}});
  }
  try{
    let exists = await User.findOne({email}).exec();
    if (exists){
      console.log(exists);
      req.flash('warning', 'Users with email already exists');
      return res.render('register', {projectName, form: {name, email}});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await new User({
      name,
      email,
      password: hash
    }).save();
    console.log('Created user with email: ' + email);
    req.flash('info', 'User created');
    res.redirect('/');
  }catch (error){
    console.error('Failed to save user', error);
    res.render('register', {projectName, form: {name, email}});
  }
});

router.get('/register', checkNotAuthenticated,  (req, res)=>{
  res.render('register', {
    projectName,
    form: {}
  });
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/',
  failureFlash: true
}))

router.get('/logout', checkAuthenticated, (req, res)=>{
  req.flash('info', 'Logged out, welcome back!');
  req.logOut();
  res.redirect('/');
});

router.get('/me', checkAuthenticated, (req, res)=>{
  res.render('user', {
    projectName,
    user: req.user
  })
});


module.exports = router;
