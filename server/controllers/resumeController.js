const pdfParse = require('pdf-parse');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const { analyzeResume } = require('../services/gemini');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Could not extract enough text from PDF. Please upload a valid resume.' });
    }

    res.json({
      fileName: req.file.originalname,
      text: text.trim(),
      pages: pdfData.numpages
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse PDF: ' + error.message });
  }
};

exports.analyzeResume = async (req, res) => {
  try {
    const { text, fileName } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    const analysis = await analyzeResume(text);

    // Save to database
    const saved = await ResumeAnalysis.create({
      userId: req.userId,
      fileName: fileName || 'resume.pdf',
      score: analysis.score,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
      rawText: text.substring(0, 5000) // Store first 5000 chars
    });

    res.json({
      id: saved._id,
      score: analysis.score,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
};
