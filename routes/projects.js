const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Project = require('../models/projects');
const Article = require('../models/articles');
const ProjectMembership = require('../models/projectMemberships');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../config/authenticationChecks');

let projectName = process.env.PROJECT;


router.get('/', checkAuthenticated, async (req, res)=>{
  let user = req.user;
  let data = [];
  try {
    const memberships = await ProjectMembership.find({
      user: user._id
    }).populate({path: 'project', populate: {path: 'owner'}});

    memberships.forEach(membership=>{
      console.log(membership);
      data.push(membership.project)
    });
    console.log({data});
    res.render('projects', {projectName, data, user});
  } catch (e) {
    req.flash('warning', 'Failed to get project mamberships');
    console.log(e);
    res.render('projects', {projectName, data, user});
  }

});

router.get('/:id', checkAuthenticated, async (req, res)=>{
  let id = req.params.id;
  const user = req.user;
  try {
    const project = await Project.findById(id).populate({path: 'owner'});
    let articles = await Article.find({
      project: project._id
    });
    project.content = {
      articles: articles
    }
    console.log({project, articles});
    res.render('project', {projectName, project, user})
  } catch (e) {
    console.log(e);
    req.flash('warning', 'Could not fetch project');
    res.redirect('/projects');
  }
});

module.exports = router;
