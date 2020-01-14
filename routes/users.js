const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

let projectName = process.env.PROJECT;


router.get('/', (req,res)=>{
  res.render('users', {
    projectName
  });
});

router.post('/', async (req, res)=>{
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

router.get('/register', (req, res)=>{
  console.log('Here is the flash', req.flash());
  res.render('register', {
    projectName,
    form: {}
  });
});


module.exports = router;
