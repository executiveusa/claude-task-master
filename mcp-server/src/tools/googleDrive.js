const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const { authorize } = require('./googleDriveAuth');

// List files in Google Drive
function listDriveFiles(callback) {
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return callback(err);
    authorize(JSON.parse(content), (auth) => {
      const drive = google.drive({ version: 'v3', auth });
      drive.files.list({
        pageSize: 10,
        fields: 'files(id, name, mimeType)',
      }, (err, res) => {
        if (err) return callback(err);
        callback(null, res.data.files);
      });
    });
  });
}

module.exports = { listDriveFiles };
