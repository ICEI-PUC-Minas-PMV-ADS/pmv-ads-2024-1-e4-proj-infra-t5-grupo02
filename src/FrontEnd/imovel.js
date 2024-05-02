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
                Endereco: document.getElementById('endereco').value,
                Complemento: document.getElementById('complemento').value,
                Cidade: document.getElementById('cidade').value,
                Estado: document.getElementById('estado').value,
                CEP: document.getElementById('cep').value,
                QtdQuartos: parseInt(document.getElementById('quartos').value, 10),
                QtdBanheiros: parseInt(document.getElementById('banheiros').value, 10),
                QtdVagasGaragem: parseInt(document.getElementById('vagas').value, 10),
                AreaTotal: parseFloat(document.getElementById('area').value, 10),
                ValorAluguel: parseInt(document.getElementById('valorAluguel').value, 10),
                ValorCondominio: parseInt(document.getElementById('valorCondo').value, 10),
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

var listaImagens = [
    { src: "./src/images/005.jpg", alt: "Imagem 1" },
    { src: "./src/images/006.jpg", alt: "Imagem 2" },
    { src: "./src/images/007.jpg", alt: "Imagem 3" },
    { src: "./src/images/008.jpg", alt: "Imagem 4" },
    { src: "./src/images/009.jpg", alt: "Imagem 5" },
    { src: "./src/images/010.jpg", alt: "Imagem 6" }
    // Adicione mais objetos conforme necessário
];

var ids = [];

function criarCardImovel(data) {
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

    var randomIndex = Math.floor(Math.random() * listaImagens.length);

    var imagemSelecionada = listaImagens[randomIndex];

    // Criando a div com classe "col-6" para a imagem
    var colImgDiv = document.createElement("div");
    colImgDiv.classList.add("col-6", "pl-0");
    rowDiv.appendChild(colImgDiv);

    // Criando a tag <img> e definindo seus atributos
    var imgTag = document.createElement("img");
    imgTag.src = imagemSelecionada.src;
    imgTag.alt = imagemSelecionada.alt;
    imgTag.id = "imagemImovel";
    imgTag.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.4)";
    colImgDiv.appendChild(imgTag);

    listaImagens.splice(randomIndex, 1);

    // Criando a div com classe "col-6" para as informações
    var colInfoDiv = document.createElement("div");
    colInfoDiv.classList.add("col-6");
    colInfoDiv.id = "descriptionImob";
    colInfoDiv.style.textDecoration = "none";
    rowDiv.appendChild(colInfoDiv);

    // Adicionando as informações do banco de dados como parágrafos
    // for (var key in data) {
    //     // if (data.hasOwnProperty(key) && key !== "imagemSrc") {
    //     //     var infoParagraph = document.createElement("p");
    //     //     infoParagraph.innerHTML = "<b>" + key + ":</b> " + data[key];
    //     //     colInfoDiv.appendChild(infoParagraph);
    //     // }
    //     if (data.hasOwnProperty('endereco')) {
    //         var enderecoParagraph = document.createElement("p");
    //         enderecoParagraph.innerHTML = "<b>Endereço:</b> " + data.endereco;
    //         colInfoDiv.appendChild(enderecoParagraph);
    //     }
    // }

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
                valorAluguelParagraph.innerHTML = "<b>" + "Valor Aluguel" + ": R$</b> " + data[key] + ",00";
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

    console.log("IDs fora do loop:", ids);

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
        colInfoDiv.appendChild(button2);
        
        button.style.display = 'none';
    }

    // Criando o botão "Veja Mais"
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("read_more_btn");
    button.textContent = "Veja Mais";
    button.addEventListener('click', showMoreInfo);
    colInfoDiv.appendChild(button);
    
    // Criando o botão "Deletar"
    var button2 = document.createElement("button");
    button2.type = "button";
    button2.classList.add("read_more_btn");
    button2.textContent = "Deletar";
    button2.addEventListener('click', function() {
        var ide = id;
        deleteLancamento(ide);
        cardDiv.remove();
    });
    colInfoDiv.appendChild(button2);

    // Criando a div para os ícones de ação
    var actionIconsDiv = document.createElement("div");
    actionIconsDiv.classList.add("pt-4", "pl-3");
    colInfoDiv.appendChild(actionIconsDiv);

    // Criando o ícone de exclusão
    var trashIcon = document.createElement("svg");
    trashIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    trashIcon.setAttribute("width", "20");
    trashIcon.setAttribute("height", "20");
    trashIcon.setAttribute("fill", "currentColor");
    trashIcon.setAttribute("class", "bi bi-trash3");
    trashIcon.setAttribute("viewBox", "0 0 16 16");
    trashIcon.innerHTML = '<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />';
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
