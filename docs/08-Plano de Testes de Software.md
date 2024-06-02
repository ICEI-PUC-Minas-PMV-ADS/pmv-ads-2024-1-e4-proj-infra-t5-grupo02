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
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar em Imóvel. <br> - Preencher os campos obrigatórios para cadastro do imóvel. <br> - Clicar no botão Enviar.|
| Critério de Êxito               | - O novo imóvel será adicionado com sucesso no banco de dados e será exibido na página Imóveis. |
|  	|  	|
| **Caso de Teste**               | **CT-03: Editar Imóvel**|
| Requisito Associado             | RF-01 - Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação.|
| Objetivo do Teste               | Usuário editar um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de edição do imóvel desejado. <br> - Alterar os campos desejados para edição do imóvel. <br> - Clicar no botão Enviar.|
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
| Critério de Êxito               | - O imóvel não será removido do banco de dados e permanecerá sendo exibido na página Imóveis. |
|  	|  	|
| **Caso de Teste**               | **CT-08: Editar o status de um Imóvel**|
| Requisito Associado             | RF-02 - Sistema dever permitir a alteração do status da locação do imóvel: disponível, alugado, em manutenção.|
| Objetivo do Teste               | Usuário alterar com sucesso o status de um imóvel no sistema.|
| Passos                          | - Estar logado na aplicação na página Imóveis. <br> - Clicar no ícone de editar do imóvel desejado. <br> - Selecionar o campo de status para modificar o status do imóvel. <br> - Clicar no botão Enviar.|
| Critério de Êxito               | - O imóvel será modificado com sucesso no banco de dados.|

## Mobile

Cenários de testes utilizados na realização dos testes da aplicação mobile EasyRent.

| **Caso de Teste**               | **CT-01: Login**|
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Objetivo do Teste               | Autenticar o usuário no app mobile|
| Passos                          | - Com o aplicativo aberto, digitar os dados de acesso do usuário.<br>- Pressionar entrar.<br>- Verificar se o usuário foi autenticado com sucesso.
| Critério de Êxito               | - Usuário logado na tela principal "Home" do aplicativo.|
|  	|  	|
| **Caso de Teste**               | **CT-02: Falha no Login**|
| Objetivo do Teste               | Falha ao autenticar o usuário no app mobile|
| Passos                          | - Com o aplicativo aberto, digitar dados incorretos de acesso do usuário.<br>- Presionar entrar.<br>- Verificar se o usuário não foi autenticado com sucesso.
|  	|  	|
| **Caso de Teste**               | **CT-03: Logout**|
| Objetivo do Teste               | Efetuar o logout no app mobile|
| Passos                          | - Com o aplicativo aberto na tela inicial, apertar o botão sair no canto superior direito da tela.
| Critério de Êxito               | - Usuário volta para a tela de autenticação.|
|  	|  	|
| **Caso de Teste**               | **CT-04: Visualizar Financeiro**|
| Objetivo do Teste               | Visualizar os lançamentos na aba Financeiro no app mobile|
| Passos                          | - Na tela inicial do aplicativo, pressionar o botão Financeiro no rodapé da aplicação.<br>- Visualizar os lançamentos.<br>
| Critério de Êxito               | - Usuário visualizará os lançamentos de sua conta.|
|  	|  	|
| **Caso de Teste**               | **CT-05: Utilizar filtro financeiro**|
| Objetivo do Teste               | Utilizar o filtro de pesquisa na tela Financeiro no app mobile|
| Passos                          | - Na tela Financeiro, digitar parâmetros de busca no campo de pesquisa no canto superior esquerdo.<br>- Visualizar os resultados filtrados.<br>
| Critério de Êxito               | - Usuário visualizará os lançamentos filtrados de sua conta.|
|  	|  	|
| **Caso de Teste**               | **CT-06: Visualizar Inquilinos**|
| Objetivo do Teste               | Visualizar os inquilinos na aba Inquilinos no app mobile|
| Passos                          | - Na tela inicial do aplicativo, pressionar o botão Inquilinos no rodapé da aplicação.<br>- Visualizar os inquilinos.<br>
| Critério de Êxito               | - Usuário visualizará os inquilinos de sua conta.|
