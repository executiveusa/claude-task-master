const mongoose = require('mongoose');

const FileMetaSchema = new mongoose.Schema({
  fileId: String,
  name: String,
  mimeType: String,
  driveUrl: String,
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FileMeta', FileMetaSchema);
