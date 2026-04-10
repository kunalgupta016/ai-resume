const router = require('express').Router();
const { uploadResume, analyzeResume } = require('../controllers/resumeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', auth, upload.single('resume'), uploadResume);
router.post('/analyze', auth, analyzeResume);

module.exports = router;
