document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('Id');
    const otherUserId = 'outroUsuarioId'; // Substitua pelo ID do outro usuário

    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesDiv = document.getElementById('messages');

    function loadMessages() {
        fetch(`https://localhost:7157/api/Messages/${userId}/${otherUserId}`)
            .then(response => response.json())
            .then(messages => {
                messagesDiv.innerHTML = '';
                messages.forEach(message => {
                    const messageDiv = document.createElement('div');
                    messageDiv.textContent = `${message.timestamp}: ${message.content}`;
                    messagesDiv.appendChild(messageDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar mensagens:', error));
    }

    sendButton.addEventListener('click', function () {
        const messageContent = messageInput.value;

        if (messageContent) {
            const message = {
                content: messageContent,
                senderId: userId,
                receiverId: otherUserId
            };

            fetch('https://localhost:7157/api/Messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
                .then(response => response.json())
                .then(data => {
                    messageInput.value = '';
                    loadMessages();
                })
                .catch(error => console.error('Erro ao enviar mensagem:', error));
        }
    });

    loadMessages();
    setInterval(loadMessages, 3000); // Atualiza as mensagens a cada 3 segundos
});
