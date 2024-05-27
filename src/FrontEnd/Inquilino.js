function fetchInquilinos() {
    const userProfile = localStorage.getItem('profile'); // Obtenha o perfil do usuário logado
    const table = document.getElementById('inquilinosTable');
    if (table) {
        fetch('https://localhost:7294/api/Inquilinos/all')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                const tbody = table.getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';

                data.forEach(inquilino => {
                    let row = tbody.insertRow();
                    row.insertCell(0).textContent = inquilino.nome;
                    row.insertCell(1).textContent = inquilino.endereco;
                    row.insertCell(2).textContent = inquilino.complemento;
                    row.insertCell(3).textContent = inquilino.cidade;
                    row.insertCell(4).textContent = inquilino.estado;
                    row.insertCell(5).textContent = inquilino.cep;
                    row.insertCell(6).textContent = inquilino.cpf;
                    row.insertCell(7).textContent = inquilino.telefone;
                    row.insertCell(8).textContent = inquilino.email;
                    row.insertCell(9).textContent = inquilino.observacao;

                    let editIcon = document.createElement('i');
                    editIcon.className = 'fas fa-edit';
                    editIcon.style.cursor = 'pointer';
                    editIcon.style.opacity = userProfile === 'Administrador' ? '0.5' : '';
                    editIcon.style.pointerEvents = userProfile === 'Administrador' ? 'none' : 'auto';
                    if (userProfile !== 'Administrador') {
                        editIcon.onclick = function() { window.location.href = `EditarInquilino.html?id=${inquilino.id}`; };
                    }
                    let cellEdit = row.insertCell(10);
                    cellEdit.appendChild(editIcon);

                    let deleteIcon = document.createElement('i');
                    deleteIcon.className = 'fas fa-trash-alt';
                    deleteIcon.style.cursor = 'pointer';
                    deleteIcon.style.opacity = userProfile === 'Administrador' ? '0.5' : '';
                    deleteIcon.style.pointerEvents = userProfile === 'Administrador' ? 'none' : 'auto';
                    if (userProfile !== 'Administrador') {
                        deleteIcon.onclick = function() { deleteInquilino(inquilino.id); };
                    }
                    let cellDelete = row.insertCell(11);
                    cellDelete.appendChild(deleteIcon);
                });
            })
            .catch(error => console.error('Erro ao buscar inquilinos:', error));
    }
}


window.deleteInquilino = function(id) {
    if (confirm('Tem certeza que deseja deletar este Inquilino?')) {
        fetch(`https://localhost:7294/api/Inquilinos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao deletar lançamento');
            }
            alert('Inquilino deletado com sucesso!');
            fetchInquilinos();
        })
        .catch(error => {
            alert('Erro ao deletar Inquilino: ' + error.message);
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('inquilinosTable')) {
        fetchInquilinos();
    } 

    const form = document.getElementById('inquilinoForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                nome: document.getElementById('nome').value.trim(),
                endereco: document.getElementById('endereco').value.trim(),
                complemento: document.getElementById('complemento').value.trim(),
                cidade: document.getElementById('cidade').value.trim(),
                estado: document.getElementById('estado').value.trim().substring(0, 2),
                cep: document.getElementById('cep').value.trim(),
                cpf: document.getElementById('cpf').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                email: document.getElementById('email').value.trim(),
                observacao: document.getElementById('observacao').value.trim()
            };

            // Simples validação de exemplo
            if (!formData.nome || !formData.endereco || !formData.cidade || 
                !formData.estado || !formData.cep || !formData.cpf || 
                !formData.telefone || !formData.email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            fetch('https://localhost:7294/api/Inquilinos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
                alert('Inquilino adicionado com sucesso!');
                window.location.href = './Inquilino.html';
                form.reset();
                fetchInquilinos();
            })
            .catch(error => {
                alert('Falha ao adicionar inquilino: ' + error.message);
            });
        });
    }
});
