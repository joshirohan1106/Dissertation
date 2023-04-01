const form = document.querySelector('#chat-form');
const chatLog = document.querySelector('#chat-log');
const messageInput = document.querySelector('#chat-message-input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message.length > 0) {
    addMessage('user', message);
    sendMessage(message);
    messageInput.value = '';
  }
});

function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  if (sender === 'user') {
    messageElement.classList.add('user-message');
  } else {
    messageElement.classList.add('bot-message');
  }
  messageElement.innerText = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage(message) {
    fetch('/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      addMessage('bot', data.message);
    })
    .catch(error => console.error(error));
  }
  