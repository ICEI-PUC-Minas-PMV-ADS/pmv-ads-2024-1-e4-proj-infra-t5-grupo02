# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Cenários de testes utilizados na realização dos testes da aplicação EasyRent atendendo aos requisitos pré-definidos na seção <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a>. 

| **Caso de Teste**               | **CT-01 - Adicionar Lançamento**|
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Requisito Associado             | RF-05 - Deve haver um controle financeiro para acompanhamento de receitas (aluguéis) e despesas (manutenções, impostos, taxas de serviço), incluindo alertas para pagamentos pendentes ou atrasados.|
| Objetivo do Teste               | Verificar se a API permite que o usuário efetue um lançamento.|
| Passos                          | 1- Executar o programa no Visual Studio<br>2- Abrir navegador com Swagger da API<br>3- Clicar em "POST/api/Lancamentos"<br>4- Clicar em "Try it out"<br>5- Clicar em "Execute"<br>6- Verificar Responses<br>7- Clicar em "GET/api/Lancamentos<br>8- Clicar em "Try it out"<br>9- Clicar em "Execute"<br>10- Verificar Responses|
| Critério de Êxito               | - Lançamento realizado pelo usuário foi salvo no banco de dados e foi exibido na consulta.|

