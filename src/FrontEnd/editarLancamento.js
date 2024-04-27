// Função para ajustar o valor selecionado de um elemento select
function setSelectValue(selectElementId, value) {
    var selectElement = document.getElementById(selectElementId);
    if (!selectElement) {
        console.error("Select element not found:", selectElementId);
        return;
    }
    var options = selectElement.options;
    var valueFound = false;
    for (var i = 0, len = options.length; i < len; i++) {
        if (options[i].value === value.toString()) {
            selectElement.selectedIndex = i;
            valueFound = true;
            break;
        }
    }
    if (!valueFound) {
        console.error('Value not found in select options:', value);
    }
}

// Função para buscar e exibir os dados do lançamento
function fetchLancamentoById(id) {
    fetch(`https://localhost:7157/api/Lancamentos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar lançamento');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data); // Verifique os dados recebidos aqui
            setSelectValue('tipo', data.tipo);
            setSelectValue('forma', data.forma);
            setSelectValue('classificacao', data.classificacao);
            setSelectValue('status', data.status);
            document.getElementById('data').value = data.data.split('T')[0];
            document.getElementById('valor').value = data.valor;
            document.getElementById('descricao').value = data.descricao;
        })
        .catch(error => console.error('Erro ao buscar detalhes do lançamento:', error));
}

// Função para enviar as alterações de um lançamento
function submitLancamentoUpdate() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        alert("ID do lançamento não encontrado!");
        return;
    }

    const lancamentoData = {
        id: parseInt(id), // Garanta que o ID esteja sendo passado como um número, se necessário
        tipo: document.getElementById('tipo').value,
        forma: document.getElementById('forma').value,
        classificacao: document.getElementById('classificacao').value,
        data: document.getElementById('data').value,
        status: document.getElementById('status').value,
        valor: parseFloat(document.getElementById('valor').value),
        descricao: document.getElementById('descricao').value,
        usuarioId: 13 // Inclua o usuárioId se necessário
    };
    
    console.log("Sending data:", JSON.stringify(lancamentoData));
    
    fetch(`https://localhost:7157/api/Lancamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lancamentoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao atualizar lançamento');
        }
        return response.text();  // Primeiro converta a resposta para texto
    })
    .then(text => {
        try {
            return JSON.parse(text);  // Tente analisar o texto como JSON
        } catch (e) {
            if (text) {
                console.error("Failed to parse JSON:", text);
                throw new Error("Resposta do servidor não é um JSON válido.");
            }
            return {};  // Se não houver texto, retorne um objeto vazio
        }
    })
    .then(updateResponse => {
        console.log("Updated data:", updateResponse);
        alert('Lançamento atualizado com sucesso!');
        window.location.href = './Financeiro.html';
    })
    .catch(error => {
        console.error('Erro ao atualizar lançamento:', error);
        alert('Erro ao atualizar lançamento: ' + error.message);
    });
    
}

// Adicionando listeners para o carregamento do documento e para o botão de salvar
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const saveButton = document.getElementById('saveButton'); // Ajuste o ID conforme necessário

    if (id) {
        fetchLancamentoById(id);
    }
    if (saveButton) {
        saveButton.addEventListener('click', submitLancamentoUpdate);
    }
});
