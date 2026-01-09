// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = 'xyz';

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
        console.error(err);
        res.json({ answer: "Sorry, I cannot answer right now." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
