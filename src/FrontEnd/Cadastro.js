document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('frm1');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
  
            const formData = {
              nome: document.getElementById('nome').value,
              email: document.getElementById('email').value,
              senha: document.getElementById('senha').value,
              perfil: document.getElementById('tipo').value
            };
  
            fetch('https://localhost:7194/api/Usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || "Erro desconhecido");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Usuário criado:', data);
                alert('Usuário adicionado com sucesso!');
                window.location.href = './Usuarios.html';
                form.reset();
            })
            .catch(error => {
                console.error('Erro ao criar Usuário:', error);
                alert('Falha ao adicionar Usuário: ' + error.message);
            });
        });
    }
});
