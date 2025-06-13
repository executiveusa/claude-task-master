const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');

router.get('/drive/list', driveController.listDriveFiles);
router.post('/drive/import', driveController.importDriveFile);

module.exports = router;
