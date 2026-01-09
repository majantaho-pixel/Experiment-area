const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false; // single command per click

const output = document.getElementById('output');
const startBtn = document.getElementById('startBtn');

// Function to speak text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Function to get AI response from backend
async function getAIResponse(question) {
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });
        const data = await response.json();
        return data.answer;
    } catch (err) {
        console.error(err);
        return "Sorry, I cannot answer right now.";
    }
}

// Start listening on button click
startBtn.addEventListener('click', () => {
    recognition.start();
    output.textContent = "Listening...";
});

// When speech is recognized
recognition.onresult = async (event) => {
    const command = event.results[0][0].transcript;
    output.textContent = `You said: ${command}`;

    // Get smart AI response
    const answer = await getAIResponse(command);
    output.textContent += `\nAI: ${answer}`;

    // Speak the AI answer
    speak(answer);
};

// Handle errors
recognition.onerror = (event) => {
    output.textContent = `Error: ${event.error}`;
};
