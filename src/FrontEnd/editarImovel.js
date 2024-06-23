function fetchLancamentoById(id) {
    fetch(`https://localhost:7030/api/Imoveis/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar lançamento');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data); // Verifique os dados recebidos aqui
            imovelTipo = document.getElementById('tipo')
            imovelTipo.value = `${data.tipoImovel}`
            imovelStatus = document.getElementById('status')
            imovelStatus.value = `${data.tipoImovel}`
            imovelEndereco = document.getElementById('endereco')
            imovelEndereco.value = `${data.endereco}`
            imovelComplemento = document.getElementById('complemento')
            imovelComplemento.value = `${data.complemento}` 
            imovelCidade = document.getElementById('cidade')
            imovelCidade.value = `${data.cidade}`
            imovelEstado = document.getElementById('estado')
            imovelEstado.value = `${data.estado}`
            imovelCEP = document.getElementById('cep')
            imovelCEP.value = `${data.cep}`
            imovelQtdQuartos = document.getElementById('quartos')
            imovelQtdQuartos.value = `${data.qtdQuartos}`
            imovelQtdBanheiros = document.getElementById('banheiros')
            imovelQtdBanheiros.value = `${data.qtdBanheiros}`
            imovelQtdVagasGaragem = document.getElementById('vagas')
            imovelQtdVagasGaragem.value = `${data.qtdVagasGaragem}`
            imovelAreaTotal = document.getElementById('area')
            imovelAreaTotal.value = `${data.areaTotal}`
            imovelValorAluguel = document.getElementById('valorAluguel')
            imovelValorAluguel.value = `${data.valorAluguel}`
            imovelValorCondominio = document.getElementById('valorCondo')
            imovelValorCondominio.value = `${data.valorCondominio}`
            imovelFoto = document.getElementById('fotos')
            imovelFoto.value = `${data.foto}`
            imovelDescricaoDetalhada = document.getElementById('descricao')
            imovelDescricaoDetalhada.value = `${data.descricaoDetalhada}`
        })
        .catch(error => console.error('Erro ao buscar detalhes do lançamento:', error));
}

function submitLancamentoUpdate() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        alert("ID do lançamento não encontrado!");
        return;
    }
    const form = document.getElementById('formPost');
    if (form) {
        const username = localStorage.getItem('username'); // Obtenha o nome de usuário logado
        const userProfile = localStorage.getItem('profile'); // Obtenha o perfil do usuário
        const userId = localStorage.getItem('Id'); // Obtenha o ID do usuário logado
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const lancamentoData = {
                id: id,
                tipoImovel: parseInt(document.getElementById('tipo').value, 10),
                Status: parseInt(document.getElementById('status').value, 10),
                Endereco: document.getElementById('endereco').value,
                Complemento: document.getElementById('complemento').value,
                Cidade: document.getElementById('cidade').value,
                Estado: document.getElementById('estado').value,
                CEP: document.getElementById('cep').value,
                QtdQuartos: parseInt(document.getElementById('quartos').value, 10),
                QtdBanheiros: parseInt(document.getElementById('banheiros').value, 10),
                QtdVagasGaragem: parseInt(document.getElementById('vagas').value, 10),
                AreaTotal: parseFloat(document.getElementById('area').value, 10),
                ValorAluguel: parseFloat(document.getElementById('valorAluguel').value, 10),
                ValorCondominio: parseFloat(document.getElementById('valorCondo').value, 10),
                Foto: document.getElementById('fotos').value,
                DescricaoDetalhada: document.getElementById('descricao').value,
                userId: userId
            };
            
            fetch(`https://localhost:7030/api/Imoveis/${id}`, {
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
                alert('Lançamento atualizado com sucesso!');
                window.location.href = './Imoveis.html';
            })
            .catch(error => {
                console.error('Erro ao atualizar lançamento:', error);
                alert('Erro ao atualizar lançamento: ' + error.message);
            });
        });
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const saveButton = document.getElementById('saveThis'); // Ajuste o ID conforme necessário

    if (id) {
        fetchLancamentoById(id);
    }
    if (saveButton) {
        saveButton.addEventListener('click', submitLancamentoUpdate);
    }
});