const { google } = require('googleapis');
const FileMeta = require('../models/FileMeta');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');

function getDriveClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(token);
  return google.drive({ version: 'v3', auth: oAuth2Client });
}

exports.listDriveFiles = async (req, res) => {
  try {
    const drive = getDriveClient();
    const response = await drive.files.list({ pageSize: 20, fields: 'files(id, name, mimeType, webViewLink)' });
    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.importDriveFile = async (req, res) => {
  try {
    const { fileId } = req.body;
    const drive = getDriveClient();
    const file = await drive.files.get({ fileId, fields: 'id, name, mimeType, webViewLink' });
    const meta = await FileMeta.create({
      fileId: file.data.id,
      name: file.data.name,
      mimeType: file.data.mimeType,
      driveUrl: file.data.webViewLink,
    });
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
