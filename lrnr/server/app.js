const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;

// import Anthropic from "@anthropic-ai/sdk";
// import * as dotenv from 'dotenv'
dotenv.config();
app.use(cors());


const anthropic = new Anthropic();

const generateQuizCall = async(topic, expertise, number, style) => {

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Generate a quiz on the topic of ${topic} with ${number} questions. The quiz should be designed for an audience with ${expertise} expertise. Please style the questions in the manner of a ${style}. Ensure the questions are varied and cover important aspects of the topic. Each question should be clear, concise, and provide multiple-choice answers if appropriate.Each question should have 4 options, each option should be divided with a, b, c, and d. Generate this only in JSON format and only return the JSON as your response. Do not include the /n escape sequence in the JSON, also the object keys should be named, quiz then inside quiz (topic, difficulty, numberOfQuestions, questions) inside of questions (question, option, correctAnswer) inside of options (a, b, c, d) and the correct answer should have the correct letter and the property of it.`
      }
    ]
  })
  
  console.log(response)
  return response.content[0].text;

}

// console.log(response.content[0].text)

app.use(express.json()); //Middleware to parse JSON bodies

app.post('/api', async (req, res) => {
  try {
    const input = req.body.input;
    const result = await generateQuizCall(input)
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: `Failed to generate quiz. ${error}` });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
