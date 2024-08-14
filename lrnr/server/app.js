//node modules packeges import
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

//connection to .env file and setting up the environment variables
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware directory
app.use(express.static(path.join(__dirname, 'build')));

//anthropic api key connection and setting up the quizcall function
const anthropic = new Anthropic();

const generateQuizCall = async(topic, expertise, number, style) => {
  try {

    //prompt that uses the API and the AI to generate a quiz, using the await function to create the quiz.
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Generate a quiz on the topic of ${topic} with ${number} questions. The quiz should be designed for an audience with ${expertise} expertise. Please style the questions in the manner of a ${style}. Ensure the questions are varied and cover important aspects of the topic. Each question should be clear, concise, and provide typed answers with the correct answers specified in JSON format. The JSON should have a structure as follows: { "quiz": { "title": "<Quiz Title>", "description": "<Quiz Description>", "questions": [ { "question": "<Question text>", "correctAnswer": "<Correct answer>", "explanation": "<Explanation of why this is the correct answer>" } ] } }. Include an explanation for each correct answer. Respond ONLY with the JSON and nothing else.`,
        }
      ]
    });


    const textResponse = response.content[0].text;
    console.log(response.content[0].text);

    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}') + 1;
    const jsonResponse = textResponse.slice(jsonStartIndex, jsonEndIndex);

    let quizData;
    try {
      quizData = JSON.parse(jsonResponse);
    } catch (jsonError) {
      throw new Error('Response from API is not valid JSON');
    }

    return quizData;
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    throw new Error('Failed to generate quiz');
  }
};

const checkAnswer = async (userAnswer, correctAnswer, question, explanation) => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Question: "${question}"
Correct answer: "${correctAnswer}"
Explanation: "${explanation}"
User's answer: "${userAnswer}"

Evaluate if the user's answer is correct or close enough to be considered correct. Consider minor typographical errors or slight variations as correct. Respond with a JSON object in the following format:
{
  "isCorrect": true/false,
  "explanation": "Explanation of the answer itself"
}
Respond ONLY with the JSON and nothing else.`
        }
      ]
    });

    const textResponse = response.content[0].text;
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}') + 1;
    const jsonResponse = textResponse.slice(jsonStartIndex, jsonEndIndex);
    console.log(response.content[0].text);

    let evaluationData;
    try {
      evaluationData = JSON.parse(jsonResponse);
    } catch (jsonError) {
      throw new Error('Response from API is not valid JSON');
    }

    return evaluationData;
  } catch (error) {
    console.error('Error checking answer:', error.message);
    throw new Error('Failed to check answer');
  }
};

app.use(express.json());

app.post('/api', async (req, res) => {
  try {
    const { input } = req.body;
    const [topic, expertise, number, style] = input.split(',').map(str => str.trim());
    const quizData = await generateQuizCall(topic, expertise, number, style);
    res.json({ result: quizData });
  } catch (error) {
    console.error('Error handling API request:', error.message);
    res.status(500).json({ error: `Failed to generate quiz. ${error.message}` });
  }
});

app.post('/api/check-answer', async (req, res) => {
  try {
    const { userAnswer, correctAnswer, question, explanation } = req.body;
    const evaluationData = await checkAnswer(userAnswer, correctAnswer, question, explanation);
    res.json(evaluationData);
  } catch (error) {
    console.error('Error handling answer check request:', error.message);
    res.status(500).json({ error: `Failed to check answer. ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});