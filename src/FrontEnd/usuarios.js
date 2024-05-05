function fetchUsuarios() {
    const table = document.getElementById('usuariosTable');
    if (table) {
        fetch('https://localhost:7194/api/Usuarios/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + seuTokenJWT // Descomente e ajuste isso se a autenticação for necessária.
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar usuários: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const tbody = table.getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            data.forEach(usuario => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = usuario.perfil;
                row.insertCell(1).textContent = usuario.nome;
                row.insertCell(2).textContent = usuario.email;

                // Botão de exclusão
                let deleteIcon = document.createElement('i');
                deleteIcon.className = 'fas fa-trash-alt';
                deleteIcon.style.cursor = 'pointer';
                deleteIcon.onclick = function() { deleteUsuario(usuario.id); };
                let cellDelete = row.insertCell(3);
                cellDelete.appendChild(deleteIcon);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
            alert('Erro ao buscar usuários: ' + error.message);
        });
    }
}

window.deleteUsuario = function(id) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        fetch(`https://localhost:7194/api/Usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + seuTokenJWT // Descomente e ajuste isso se a autenticação for necessária.
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao deletar usuário');
            }
            alert('Usuário deletado com sucesso!');
            fetchUsuarios(); // Atualiza a lista após a deleção.
        })
        .catch(error => {
            alert('Erro ao deletar Usuário: ' + error.message);
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    fetchUsuarios(); // Chama a função fetchUsuarios quando o documento é carregado.
});
