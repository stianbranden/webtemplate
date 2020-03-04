const express = require('express');
const router = express.Router();
const Article = require('../../models/articles');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../../config/authenticationChecks');

router.post('/new/:projectId', checkAuthenticated, async (req, res)=>{
  let data = req.body;
  let projectId = req.params.projectId;
  try {
    let article = await new Article({
      title: data.blocks[0].data.text,
      timeStamp: data.time,
      data: JSON.stringify(data),
      owner: req.user.id,
      project: projectId
    }).save();
    req.flash('info', 'Knowledge created');
    res.redirect('/projects/' + projectId);
  } catch (e) {
    console.log(e);
    req.flash('warning', 'Error in creating Knowledge');
    res.redirect('/projects/' + projectId);
  }
});

router.put('/', checkAuthenticated, async (req, res)=>{
  res.status(500);
});

module.exports = router;
