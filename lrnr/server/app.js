const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

app.post('/api/generate-quiz', async (req, res) => {
  const { topic, expertise, questionCount, styleOfQuestions } = req.body;

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ]
    });

    res.json({ questions: msg.content.split('\n') }); 
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
