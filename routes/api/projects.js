const express = require('express');
const router = express.Router();
const Project = require('../../models/projects');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../../config/authenticationChecks');

router.put('/', checkAuthenticated, async (req, res)=>{
  let id = req.body.id;
  let body = req.body;
  delete body.id;
  //console.log(body);

  try {
    let update = await Project.findByIdAndUpdate(id, body, {new:true});
    res.json({
      msg: 'Success',
      update
    });
  } catch (e) {
    res.status(500).json({msg:'Failed to update project'});
  }
});

module.exports = router;
