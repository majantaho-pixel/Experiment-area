// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = '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';

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });
        const data = await response.json();
        res.json({ answer: data.choices[0].message.content });
    } catch (err) {
        res.json({ answer: "Sorry, I cannot answer right now." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
