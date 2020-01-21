const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../../config/authenticationChecks');

router.put('/', checkAuthenticated, async (req, res)=>{
  let id = req.body.id;
  let body = req.body;
  delete body.id;
  if (body.password){
    //Validate that password is OK format else return error message
  }
  console.log(body);
  try {
    let updatedUser = await User.findByIdAndUpdate(id, body, {new:true}).exec();
    res.json({
      msg: 'Success',
      updatedUser
    })
  } catch (e) {
    res.status(500).json({msg:'Failed to save user'});
  }
});

module.exports = router;
