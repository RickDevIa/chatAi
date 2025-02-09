require('dotenv').config();
const cors = require('cors')
const express = require('express');
const path = require('path');
const port = 3000;

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '.')));
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.post("/chat", async (req, res) => {
  try{
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
    const chat = model.startChat({
        history: chatHistory
    });
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    let text;
    try {
      text = await response.text();
    } catch (jsonError) {
      console.error("Error parsing text:", jsonError, jsonError.stack);
      text = "Error parsing text response";
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({"text":text});
  } catch (error) {
    console.error("Error in /chat:", error, error.stack);
        res.status(500).json({ text: "An error occurred during chat processing." });
    
  }
});

app.post("/stream", async (req, res) => {
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
    const chat = model.startChat({
      history: chatHistory
    });
    const result = await chat.sendMessageStream(msg);
    let fullText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
    }
    res.setHeader('Content-Type', 'application/json');
    res.json({"text": fullText});
});
  
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
