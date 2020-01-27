const mongoose = require('mongoose');
const User = require('./users.js');
const Project = require('./projects.js');
const projectMembershipSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const ProjectMembership = mongoose.model('ProjectMembership', projectMembershipSchema);

module.exports = ProjectMembership;
module.exports.add = (users, projects)=>{
  return new Promise(function(resolve, reject){
    let pm = [];
    try {
      users.forEach(user=>{
        projects.forEach(async project=>{
          let p = await new ProjectMembership({
            user,
            project
          }).save();
          pm.push(p);
        });
      });
      resolve(pm);
    } catch (e) {
      reject(e);
    }
  });
}
