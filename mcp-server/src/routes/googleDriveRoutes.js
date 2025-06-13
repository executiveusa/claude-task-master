const express = require('express');
const router = express.Router();
const { listDriveFiles } = require('../tools/googleDrive');

// List Google Drive files
router.get('/list-drive-files', (req, res) => {
  listDriveFiles((err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files });
  });
});

module.exports = router;
