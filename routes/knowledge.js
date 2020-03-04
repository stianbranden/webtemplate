const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Project = require('../models/projects');
const ProjectMembership = require('../models/projectMemberships');
const Article = require('../models/articles');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../config/authenticationChecks');
const boilerplate = require('../config/editorjs-boilerplate');

let projectName = process.env.PROJECT;


router.get('/', checkAuthenticated, async (req, res)=>{
  res.status(404);

});

router.get('/new/:projectId', checkAuthenticated, async (req, res)=>{
  try {
    let projectId = req.params.projectId;
    let user = req.user;
    let project = await Project.findById(projectId).populate({path: 'owner'});
    let article = {project, data: JSON.stringify(boilerplate)};
    console.log(article);
    res.render('knowledge', {projectName, user, article});
  } catch (e) {
    console.log(e);
    req.flash('warning', 'Could not fetch project');
    res.redirect('/dashboard');
  }
});

router.get('/:articleId', checkAuthenticated, async (req, res)=>{
  try {
    let {articleId} = req.params;
    let article = await Article.findById(articleId).populate({path: 'owner'}).populate({path: 'project'});
    res.json(article);
  } catch (e) {
    console.log(e);
    req.flash('warning', 'Could not fetch article');
    res.redirect('/dashboard');
  }
});

router.post('/new/:projectId', checkAuthenticated, async (req, res)=>{
  let projectId = req.params.projectId;
  let userId = req.user.id;
  let data = req.body;
  let title = 'Placeholder';
  data.blocks.forEach(block=>{
    if ( title === 'Placeholder' && block.type === 'title' ){
        title = block.data.text;
    }
  });
  try {
    const article = await new Article({
      title,
      timeStamp: data.time,
      version: data.version,
      data: JSON.stringify(data),
      owner: userId,
      project: projectId
    }).save();
    res.redirect('/article/' + article.id);
  } catch (e) {
    req.flash('warning', 'Could not create article');
    req.redirect('/article/new/' + projectId);
    console.log(e);
  }

});

module.exports = router;
