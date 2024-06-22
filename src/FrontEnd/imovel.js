function fetchLancamentos() {
    const table = document.getElementById('lancamentosTable');
    if (table) {
        fetch('https://localhost:7030/api/Imoveis')
            .then(response => response.json())
            .catch(error => console.error('Erro ao buscar imoveis:', error));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('formPost');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
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
            };

            fetch('https://localhost:7030/api/Imoveis', {
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
                window.location.href = './Imoveis.html';
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

var ids = [];

function criarCardImovel(data) {
    console.log("Data received:", data);
    // Criando a div principal
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card_imovel");

    // Criando a div para a cor do hover
    var hoverColorDiv = document.createElement("div");
    hoverColorDiv.classList.add("hover_color_bubble");
    cardDiv.appendChild(hoverColorDiv);

    // Criando a div com classe "row"
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    cardDiv.appendChild(rowDiv);

    // var randomIndex = Math.floor(Math.random() * listaImagens.length);

    // var imagemSelecionada = listaImagens[randomIndex];

    // Criando a div com classe "col-6" para a imagem
    var colImgDiv = document.createElement("div");
    colImgDiv.classList.add("col-6", "pl-0");
    rowDiv.appendChild(colImgDiv);

    // Criando a tag <img> e definindo seus atributos
    var imgTag = document.createElement("img");
    imgTag.src = data.foto;
    // imgTag.alt = imagemSelecionada.alt;
    imgTag.id = "imagemImovel";
    imgTag.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.4)";
    colImgDiv.appendChild(imgTag);

    // listaImagens.splice(randomIndex, 1);

    // Criando a div com classe "col-6" para as informações
    var colInfoDiv = document.createElement("div");
    colInfoDiv.classList.add("col-6");
    colInfoDiv.id = "descriptionImob";
    colInfoDiv.style.textDecoration = "none";
    rowDiv.appendChild(colInfoDiv);

    var statusAdded = false;
    var enderecoAdded = false;
    var complementoAdded = false;
    var cidadeAdded = false;
    var estadoAdded = false;
    var cepAdded = false;
    var AreaAdded = false;
    var QtdQuartosAdded = false;
    var QtdBanheirosAdded = false;
    var QtdVagasGaragemAdded = false;
    var ValorAluguelAdded = false;
    var ValorCondominioAdded = false;
    var DescricaoDetalhadaAdded = false;
    var idAdded = false;

    for (var key in data) {
        if (data.hasOwnProperty(key) && key !== "imagemSrc") {
            if (key === "status" && !statusAdded) {
                var statusParagraph = document.createElement("p");
                var traducao = data[key];
                let statusShow;
                if (traducao === 0)
                    statusShow = "Disponível"
                else if (traducao === 1)
                    statusShow = "Alugado"
                else if (traducao === 2)
                    statusShow = "Em Manutenção"
                statusParagraph.innerHTML = "<b>" + "Status" + ":</b> " + statusShow;
                colInfoDiv.appendChild(statusParagraph);
                statusParagraph = true;
            }
            if (key === "endereco" && !enderecoAdded) {
                var enderecoParagraph = document.createElement("p");
                enderecoParagraph.innerHTML = "<b>" + "Endereco" + ":</b> " + data[key];
                colInfoDiv.appendChild(enderecoParagraph);
                enderecoAdded = true;
            }
            
            if (key === "cidade" && !cidadeAdded) {
                var cidadeParagraph = document.createElement("p");
                cidadeParagraph.innerHTML = "<b>" + "Cidade" + ":</b> " + data[key];
                colInfoDiv.appendChild(cidadeParagraph);
                cidadeAdded = true;
            }
            
            if (key === "cep" && !cepAdded) {
                var cepParagraph = document.createElement("p");
                cepParagraph.innerHTML = "<b>" + "CEP" + ":</b> " + data[key];
                colInfoDiv.appendChild(cepParagraph);
                cepAdded = true;
            }

            if (key === "areaTotal" && !AreaAdded) {
                var areaParagraph = document.createElement("p");
                areaParagraph.innerHTML = "<b>" + "Area Total" + ":</b> " + data[key] + "m²";
                colInfoDiv.appendChild(areaParagraph);
                AreaAdded = true;
            }
            if (key === "valorAluguel" && !ValorAluguelAdded) {
                var valorAluguelParagraph = document.createElement("p");
                valorAluguelParagraph.innerHTML = "<b>" + "Valor Aluguel" + ":</b> " + data[key].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                colInfoDiv.appendChild(valorAluguelParagraph);
                ValorAluguelAdded = true;
            }
            if (key === "id" && !idAdded) {
                var id = data[key]; // Armazena o ID na variável 'id'
                ids.push(id); // Adicione o ID ao array de IDs
                idAdded = true;
            }
        }
    }

    function deleteLancamento(id) {
        if (confirm('Tem certeza que deseja deletar este lançamento?')) {
            fetch(`https://localhost:7030/api/Imoveis/${id}`, {
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

            return true;
        }

        else {
            return false;
        }
    }

    function showMoreInfo() {

        var additionalKeys = ['qtdQuartos', 'qtdBanheiros', 'qtdVagasGaragem']; // Add more keys as needed
        
        additionalKeys.forEach(function(key) {
            if (data.hasOwnProperty(key) && key !== "imagemSrc") {
                if (key === "qtdQuartos" && !QtdQuartosAdded) {
                    var qtdQuartosParagraph = document.createElement("p");
                    qtdQuartosParagraph.innerHTML = "<b>" + "Quantidade de quartos" + ":</b> " + data[key];
                    colInfoDiv.appendChild(qtdQuartosParagraph);
                    qtdQuartosParagraph = true;
                }
                if (key === "qtdBanheiros" && !QtdBanheirosAdded) {
                    var qtdBanheirosParagraph = document.createElement("p");
                    qtdBanheirosParagraph.innerHTML = "<b>" + "Quantidade de banheiros" + ":</b> " + data[key];
                    colInfoDiv.appendChild(qtdBanheirosParagraph);
                    qtdBanheirosParagraph = true;
                }
                if (key === "qtdVagasGaragem" && !QtdVagasGaragemAdded) {
                    var qtdVagasGaragemAddedParagraph = document.createElement("p");
                    qtdVagasGaragemAddedParagraph.innerHTML = "<b>" + "Vagas garagem" + ":</b> " + data[key];
                    colInfoDiv.appendChild(qtdVagasGaragemAddedParagraph);
                    qtdVagasGaragemAddedParagraph = true;
                }
            }
        });

        colInfoDiv.appendChild(actionIconsDiv);
        colInfoDiv.appendChild(editIcon);
        colInfoDiv.appendChild(trashIcon);
        
        button.style.display = 'none';
    }

    // Criando o botão "Veja Mais"
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("read_more_btn");
    button.textContent = "Veja Mais";
    button.addEventListener('click', showMoreInfo);
    colInfoDiv.appendChild(button);

    // Criando a div para os ícones de ação
    var actionIconsDiv = document.createElement("div");
    actionIconsDiv.classList.add("pt-4", "pl-3");
    colInfoDiv.appendChild(actionIconsDiv);

    // Criando o ícone de edição
    let editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit';
    editIcon.style.cursor = 'pointer';
    editIcon.onclick = function() { window.location.href = `EditarImovel.html?id=${id}`; };
    actionIconsDiv.appendChild(editIcon);

    // Criando o ícone de exclusão
    var trashIcon = document.createElement("i");
    trashIcon.className = 'fas fa-trash-alt';
    trashIcon.style.cursor = 'pointer';
    trashIcon.addEventListener('click', function() {
        var ide = id;
        deleted = deleteLancamento(ide);
        if(deleted) {
            cardDiv.remove();
        }
    });
    actionIconsDiv.appendChild(trashIcon);

    // Adicionando a div principal ao documento
    document.getElementById('meusCards').appendChild(cardDiv);
}

// Função para buscar os dados do banco de dados e criar os cards
function buscarDadosEBuildCards() {
    fetch('https://localhost:7030/api/Imoveis')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                criarCardImovel(item);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Chama a função para buscar os dados e construir os cards ao carregar a página
document.addEventListener('DOMContentLoaded', buscarDadosEBuildCards);