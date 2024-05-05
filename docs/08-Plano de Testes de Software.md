# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Cenários de testes utilizados na realização dos testes da aplicação EasyRent atendendo aos requisitos pré-definidos na seção <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a>. 

| **Caso de Teste**               | **CT-01: Adicionar Lançamento**|
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Requisito Associado             | RF-05 - Deve haver um controle financeiro para acompanhamento de receitas (aluguéis) e despesas (manutenções, impostos, taxas de serviço), incluindo alertas para pagamentos pendentes ou atrasados.|
| Objetivo do Teste               | Verificar se a API permite que o usuário efetue um lançamento.|
| Passos                          | 1- Executar o programa no Visual Studio<br>2- Abrir navegador com Swagger da API<br>3- Clicar em "POST/api/Lancamentos"<br>4- Clicar em "Try it out"<br>5- Clicar em "Execute"<br>6- Verificar Responses<br>7- Clicar em "GET/api/Lancamentos<br>8- Clicar em "Try it out"<br>9- Clicar em "Execute"<br>10- Verificar Responses|
| Critério de Êxito               | - Lançamento realizado pelo usuário foi salvo no banco de dados e foi exibido na consulta.|
|  	|  	|
| **Caso de Teste**               | **CT-02: Adicionar Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário cadastrar um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imoveis. <br> - Clicar em Imóvel. <br> - Preencher os campos obrigatórios para cadastro do imóvel. <br> - Clicar no botão Enviar|
| Critério de Êxito               | - O novo imóvel será adicionado com sucesso no banco de dados e será exibido na página Imoveis. |
|  	|  	|
| **Caso de Teste**               | **CT-03: Editar Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário editar um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imoveis. <br> - Clicar no ícone de edição do imóvel desejado. <br> - Alterar os campos desejados para edição do imóvel. <br> - Clicar no botão Enviar|
| Critério de Êxito               | - O imóvel será editado com sucesso no banco de dados e será exibido com as modificações na página Imóveis. |
|  	|  	|
| **Caso de Teste**               | **CT-04: Remover Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário remover um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de lixeira do imóvel desejado. <br> - Clicar no botão ok do alerta.|
| Critério de Êxito               | - O imóvel será removido com sucesso no banco de dados e deixará de ser exibido na página Imóveis. |
|  	|  	|
| **Caso de Teste**               | **CT-05: Falha ao adicionar Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário não preencher um campo de informação no cadastro de um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar em Imóvel. <br> - Não preencher os campos obrigatórios para cadastro do imóvel. <br> - Clicar no botão Enviar.|
| Critério de Êxito               | - O usuário receberá uma mensagem informando qual o campo obrigatório falta ser preenchido e o imóvel não será lançado no banco de dados. |
|  	|  	|
| **Caso de Teste**               | **CT-06: Falha ao editar Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário não preencher um campo de informação na página editar de um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de edição do imóvel desejado. <br> - Alterar deixando em branco algum campo na edição do imóvel. <br> - Clicar no botão Enviar.|
| Critério de Êxito               | - O usuário receberá uma mensagem informando qual o campo obrigatório falta ser preenchido e o imóvel não será editado no banco de dados. |
|  	|  	|
| **Caso de Teste**               | **CT-07: Cancelar remoção de um Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário declinar a confirmação de remoção um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de lixeira do imóvel desejado. <br> - Clicar no botão cancelar do alerta.|
| Critério de Êxito               | - O imóvel não será removido do banco de dados e permanecerá de sendo exibido na página Imóveis. |
|  	|  	|
| **Caso de Teste**               | **CT-08: Editar o status de um Imóvel**|
| Requisito Associado             | RF-02 - Sistema dever permitir a alteração do status da locação do imóvel: disponível, alugado, em manutenção.|
| Objetivo do Teste               | Usuário alterar com sucesso o status de um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de editar do imóvel desejado. <br> - Selecionar o campo de status para modificar o status do imóvel. <br> - Clicar no botão Enviar.|
| Critério de Êxito               | - O imóvel será modificado com sucesso no banco de dados.|
