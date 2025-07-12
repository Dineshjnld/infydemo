document.addEventListener('DOMContentLoaded', () => {
    // Chat functionality
    const chatHistory = document.getElementById('chat-history');
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');

    chatSubmit.addEventListener('click', () => {
        const message = chatInput.value;
        if (message) {
            appendMessage('user', message);
            chatInput.value = '';
            // Send message to backend and get response
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Fetch and display weather data
    fetch('/api/weather')
        .then(response => response.json())
        .then(data => {
            const weatherData = document.getElementById('weather-data');
            weatherData.innerHTML = `
                <p>Temperature: ${data.temperature}°C</p>
                <p>Condition: ${data.condition}</p>
            `;
        });

    // Fetch and display crop suggestions
    fetch('/api/crops')
        .then(response => response.json())
        .then(data => {
            const cropData = document.getElementById('crop-data');
            let suggestionsHTML = '<ul>';
            data.suggestions.forEach(crop => {
                suggestionsHTML += `<li>${crop}</li>`;
            });
            suggestionsHTML += '</ul>';
            cropData.innerHTML = suggestionsHTML;
        });

    // Chat functionality
    chatSubmit.addEventListener('click', () => {
        const message = chatInput.value;
        if (message) {
            appendMessage('user', message);
            chatInput.value = '';
            fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                appendMessage('bot', data.response);
            });
        }
    });
});
