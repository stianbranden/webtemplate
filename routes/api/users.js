const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../../config/authenticationChecks');
const pwordValidator = require('../../config/passwordValidator');

router.put('/', checkAuthenticated, async (req, res)=>{
  let id = req.body.id;
  let body = req.body;
  delete body.id;
  if (body.password){
    if (body.password === body.password2 ){
      let validation = pwordValidator(body.password);
      if (!validation.validated){
        return res.status(400).json({msg: validation.msg});
      }
    }
    else {
      return res.status(400).json({msg: 'Passwords do not match'});
    }
  }
  //console.log(body);

  try {
    if (body.password){
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;
    }
    let updatedUser = await User.findByIdAndUpdate(id, body, {new:true}).exec();
    res.json({
      msg: 'Success',
      updatedUser
    })
  } catch (e) {
    res.status(500).json({msg:'Failed to update user'});
  }
});

module.exports = router;
