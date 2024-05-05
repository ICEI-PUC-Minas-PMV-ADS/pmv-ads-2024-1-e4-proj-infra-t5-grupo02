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


function fetchInquilinoById(id) {
    fetch(`https://localhost:7294/api/Inquilinos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar Inquilino');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data); 
            document.getElementById('nome').value = data.nome || '';
            document.getElementById('endereco').value = data.endereco || '';
            document.getElementById('complemento').value = data.complemento || '';
            document.getElementById('cidade').value = data.cidade || '';
            document.getElementById('estado').value = data.estado || '';
            document.getElementById('cep').value = data.cep || '';
            document.getElementById('cpf').value = data.cpf || '';
            document.getElementById('telefone').value = data.telefone || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('observacao').value = data.observacao || '';
        })
        .catch(error => console.error('Erro ao buscar detalhes do Inquilino:', error));
}

function submitInquilinoUpdate() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        alert("ID do Inquilino não encontrado!");
        return;
    }

    const inquilinoData = {
        id: parseInt(id), 
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
    
    console.log("Sending data:", JSON.stringify(inquilinoData));
    
    fetch(`https://localhost:7294/api/Inquilinos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquilinoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao atualizar Inquilino');
        }
        return response.text();
    })
    .then(text => {
        try {
            return JSON.parse(text); 
        } catch (e) {
            if (text) {
                console.error("Failed to parse JSON:", text);
                throw new Error("Resposta do servidor não é um JSON válido.");
            }
            return {}; 
        }
    })
    .then(updateResponse => {
        console.log("Updated data:", updateResponse);
        alert('Inquilino atualizado com sucesso!');
        window.location.href = './Inquilino.html';
    })
    .catch(error => {
        console.error('Erro ao atualizar Inquilino:', error);
        alert('Erro ao atualizar Inquilino: ' + error.message);
    });
    
}


document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const saveButton = document.getElementById('saveButton');

    if (id) {
        fetchInquilinoById(id);
    }
    if (saveButton) {
        saveButton.addEventListener('click', submitInquilinoUpdate);
    }
});
