const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  index:       { type: String, required: true },  // "PROJECT_001"
  name:        { type: String, required: true },
  description: { type: String, required: true },
  stack:       [{ type: String }],                // ["React", "Node.js"]
  githubUrl:   { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  featured:    { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);