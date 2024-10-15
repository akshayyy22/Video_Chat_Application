const socket = new WebSocket('http://localhost:3000/chatrooms');

// Elements
const roomNameInput = document.getElementById('room-name');
const joinBtn = document.getElementById('join-btn');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// Join Room
joinBtn.addEventListener('click', () => {
    const roomName = roomNameInput.value;
    if (roomName) {
        socket.emit('joinRoom', roomName);
        chatContainer.style.display = 'block';
    }
});

// Receive Messages
socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});

// Send Message
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    const roomName = roomNameInput.value; // Ensure you're sending to the correct room
    if (message && roomName) {
        socket.emit('chatMessage', { roomName, message });
        messageInput.value = ''; // Clear input field
    }
});
