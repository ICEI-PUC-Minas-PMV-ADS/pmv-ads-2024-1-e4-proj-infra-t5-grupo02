let inquilinosMap = {};

fetch('https://localhost:7294/api/Inquilinos/all')
.then(response => response.json())
.then(data => {
    data.forEach(inquilino => {
        inquilinosMap[inquilino.id] = inquilino.nome;
    });
    fetchLancamentos(); // Agora, chamamos fetchLancamentos depois de ter os inquilinos
})
.catch(error => console.error('Erro ao carregar inquilinos:', error));

function fetchLancamentos() {
    const table = document.getElementById('lancamentosTable');
    if (table) {
        fetch('https://localhost:7157/api/Lancamentos/all')
            .then(response => response.json())
            .then(data => {
                const tbody = table.getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';

                data.forEach(lancamento => {
                    let row = tbody.insertRow();
                    let dataFormatada = new Date(lancamento.data).toLocaleDateString('pt-BR');
                    let valorFormatado = parseFloat(lancamento.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    let status = lancamento.status === 'aPagar' ? 'A Pagar' : lancamento.status === 'pago' ? 'Pago' : lancamento.status === 'pendente' ? 'Pendente' : lancamento.status;

                    let nomeInquilino = inquilinosMap[lancamento.inquilino] || 'Sem inquilino'; // Usando o mapa para encontrar o nome

                    row.insertCell(0).textContent = nomeInquilino;
                    row.insertCell(1).textContent = dataFormatada;
                    row.insertCell(2).textContent = lancamento.tipo;
                    row.insertCell(3).textContent = lancamento.forma;
                    row.insertCell(4).textContent = lancamento.classificacao;
                    row.insertCell(5).textContent = status;
                    row.insertCell(6).textContent = valorFormatado;
                    row.insertCell(7).textContent = lancamento.descricao;

                    // Botão de edição
                    let editIcon = document.createElement('i');
                    editIcon.className = 'fas fa-edit';
                    editIcon.style.cursor = 'pointer';
                    editIcon.onclick = function() { window.location.href = `EditarLancamento.html?id=${lancamento.id}`; };
                    let cellEdit = row.insertCell(8);
                    cellEdit.appendChild(editIcon);

                    // Botão de exclusão
                    let deleteIcon = document.createElement('i');
                    deleteIcon.className = 'fas fa-trash-alt';
                    deleteIcon.style.cursor = 'pointer';
                    deleteIcon.onclick = function() { deleteLancamento(lancamento.id); };
                    let cellDelete = row.insertCell(9);
                    cellDelete.appendChild(deleteIcon);
                });
            })
            .catch(error => console.error('Erro ao buscar lançamentos:', error));
    }
}

window.deleteLancamento = function(id) {
    if (confirm('Tem certeza que deseja deletar este lançamento?')) {
        fetch(`https://localhost:7157/api/Lancamentos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao deletar lançamento');
            }
            alert('Lançamento deletado com sucesso!');
            fetchLancamentos();
        })
        .catch(error => {
            alert('Erro ao deletar lançamento: ' + error.message);
        });
    }
};


document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('lancamentosTable')) {
        fetchLancamentos();
    }

    const form = document.getElementById('meuFormulario');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                inquilino: document.getElementById('inquilino').value,
                tipo: parseInt(document.getElementById('tipo').value, 10),
                forma: parseInt(document.getElementById('forma').value, 10),
                classificacao: parseInt(document.getElementById('classificacao').value, 10),
                data: document.getElementById('data').value,
                status: parseInt(document.getElementById('status').value, 10),
                valor: parseFloat(document.getElementById('valor').value) || 0,
                descricao: document.getElementById('descricao').value,
                usuarioId: 13 // Ajustar conforme necessário para integrar o ID do usuário de forma dinâmica
            };

            fetch('https://localhost:7157/api/Lancamentos', {
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
                console.log('Lançamento criado:', data);
                alert('Lançamento adicionado com sucesso!');
                form.reset();
                if (document.getElementById('lancamentosTable')) {
                    fetchLancamentos();
                }
            })
            .catch(error => {
                console.error('Erro ao criar lançamento:', error);
                alert('Falha ao adicionar lançamento: ' + error.message);
            });
        });
    }
});

