const router = require('express').Router();
const auth = require('../middleware/auth');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const InterviewAttempt = require('../models/InterviewAttempt');

// Get resume analysis history
router.get('/resumes', auth, async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-rawText');
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get interview attempt history
router.get('/interviews', auth, async (req, res) => {
  try {
    const attempts = await InterviewAttempt.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a resume analysis
router.delete('/resumes/:id', auth, async (req, res) => {
  try {
    await ResumeAnalysis.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an interview attempt
router.delete('/interviews/:id', auth, async (req, res) => {
  try {
    await InterviewAttempt.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
