const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  timeStamp: {
    type: Number,
    required: true,
    default: 0
  },
  version: {
    type: Number,
    default: 1
  },
  data: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Article', articleSchema);
