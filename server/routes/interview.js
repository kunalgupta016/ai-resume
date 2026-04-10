const router = require('express').Router();
const { generateQuestions, evaluateAnswer } = require('../controllers/interviewController');
const auth = require('../middleware/auth');

router.post('/generate-questions', auth, generateQuestions);
router.post('/evaluate-answer', auth, evaluateAnswer);

module.exports = router;
