const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  projectType: {
    type: String,
    required: true,
    default: 'Private'
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Project', projectSchema);
