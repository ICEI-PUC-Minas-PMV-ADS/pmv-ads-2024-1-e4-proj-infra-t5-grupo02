# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

`Vera Lucia` - É uma viúva aposentada muito ligada em tecnologia, que deseja locar alguns de seus imóveis que estão há anos na família e descobriu por meio das netas que era possíveis gerenciar seus imóveis via aplicativo no celular sem ter que lidar com as burocracias de uma imobiliária convencional.

`Luis Otávio` - É um corretor que está há anos trabalhando no mercado imobiliário e tem uma locadora em uma cidade pequena do interior. Ele deseja expandir seus negócios para as cidades vizinhas, mas para isso ele precisa de ferramentas modernas que possibilitem uma melhor gestão de seus imóveis.

`Lar e Sonhos` - É uma grande imobiliária que está há anos no mercado e possui filiais em diversos estados. Para inovar, Paulo César, dono da imobiliária, procura por uma plataforma que permite incluir todas as informações de sua imobiliária, de forma a facilitar o gerenciamento de seus contratos e documentos. Ele acredita que trazer essa facilidade para o locatário também pode ser uma forma de destacar-se da concorrência.

`Marcelo Silva` - Investidor visionário e empreendedor bem-sucedido no setor do agronegócio, sempre em busca de oportunidades para diversificar seus investimentos e aumentar seu patrimônio. Recentemente, viu uma grande oportunidade de investimento no mercado imobiliário, especialmente na compra de apartamentos na planta, visando à locação futura, onde acredita ser um excelente negócio, além de ser uma fonte de renda passiva atrativa. 
 
`Felipe Duarte` - Empresário e Corretor de imóveis independente, que com a renda de seus empreendimentos, investiu em locais estratégicos para lucrar com aluguéis. Felipe gerencia por conta própria seus aluguéis e contratos e com o aumento de inquilinos sentiu a necessidade de um local virtual para unificar essas informações, além de poder controlar com mais clareza e praticidade. 

`Consolida Imóveis` - Uma conceituada imobiliária da cidade de São Paulo. Seus fundadores, Sr. Carlo e Sra. Antônia, decidiram expandir seus negócios para a grande São Paulo. Assim, com o aumento de clientes vindos de cidades vizinhas à capital, sentiram a necessidade de organizar e modernizar a forma com que administram seus aluguéis.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Vera Lúcia          | Uma aplicação de gestão prática   | Gerenciar e ter maior controle sobre seus imóveis  |
|Luis Otávio         | Uma aplicação moderna e ágil   | Expandir o seu negócio    |
|Lar e Sonhos        | Uma aplicação robusta que proporcione o gerenciamento de documentos em grande escala | Ter mais segurança nos dados sigilosos    |
|Marcelo Silva       | Uma aplicação acessível tanto via web quanto mobile  | Gerenciar de maneira simples todos os empreendimentos alugados, desde os detalhes dos contratos de locação até a comunicação eficiente com locatários e imobiliárias   |
|Felipe Duarte       | Poder controlar as informações relacionada aos imóveis | Ter mais clareza e praticidade   |
|Consolida Imóveis   | Cadastrar imóveis com sua localização exata | Capitalizar clientes de acordo com a localização do imóvel |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01| Sistema deve permitir o cadastro, edição e deletar imóveis, localização, características específicas, status de locação. | ALTA | 
|RF-02| Sistema dever permitir a alteração do status da locação do imóvel: disponível, alugado, em manutenção| MÉDIA|
|RF-03| Facilitar o gerenciamento de contratos de locação, incluindo dados dos locatários, prazos, valores e datas de pagamento | ALTA|
|RF-04| Deve ser possível ter acesso a documentos digitalizados, tais como: contratos, termos de vistoria, e outros documentos relevantes a locação.   | MÉDIA |
|RF-05| Deve haver um controle financeiro para acompanhamento de receitas (aluguéis) e despesas (manutenções, impostos, taxas de serviço), incluindo alertas para pagamentos pendentes ou atrasados.| MÉDIA |
|RF-06| Sistema deve disponibilizar relatórios gerenciais.| MÉDIA|
|RF-07| Sistema deve ter um perfil admin, que será responsável pela gestão da aplicação, além de criar os acessos dos locatários para que estes possam visualizar todas as informações sobre sua locação. | ALTA|
|RF-08| Sistema deve ter um perfil usuário, que será responsável por inserir e gerenciar os imóveis lançados na aplicação | ALTA|
|RF-09| Sistema deve ter um perfil locador, que visualizará todas as informações sobre o seu imóvel locado | ALTA|
|RF-10| Deve haver uma sistema de notificação dentro da aplicação | BAIXA|



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-02| Deve processar requisições do usuário em no máximo 2s |  BAIXA |
|RNF-03| Sistema deve garantir acessibilidade consistente e sem falhas em sua interface, seja acesso via o navegador Chrome, ou acessado pelo edge. | MÉDIA|
|RNF-04| Deve estar disponível para no máximo 100 usuários em acesso simultâneo | ALTA|
|RNF-05| O sistema deve garantir segurança robusta, protegendo os dados do usuário através de autenticação e autorização adequadas, além de utilizar criptografia para comunicações sensíveis.| ALTA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto dever ser finalizado em Junho de 2024   |
|02| Não realizar/utilizar serviços terceirizados na execução do projeto  |


## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/blob/main/docs/img/CasodeUso%20-%20EasyRent.png)


## Gerenciamento de Projeto 

Garantir um bom resultado no fim de um contrato de locação requer uma administração eficaz. Isso inclui acompanhar vários elementos durante o contrato, seja o valor do aluguel, prazos, condição do imóvel e custos extras. Mudanças em qualquer desses pontos afetam os outros.  

À medida que o administrador tem mais controle sobre os elementos do contrato de locação, suas chances de alcançar os objetivos aumentam. Isso acontece porque um controle eficaz ajuda a resolver problemas rapidamente, evitando complicações. 

## Gerenciamento de Tempo 

Cada objetivo consiste em um alvo a ser alcançado, e é importante determinar quando isso deve acontecer. Se não houver um prazo definido, a meta pode não ser priorizada e nunca será concluída. 

As atividades serão acompanhadas usando um Kanban, listando todas as atividades com seus prazos de início e término, facilitando o controle do progresso e entendimento da completude de cada tarefa.  

 
## Gerenciamento de Equipe 

No contexto do gerenciamento de projetos, a presença e a contribuição das pessoas são elementos fundamentais para o sucesso. Stakeholders, sejam eles internos ou externos, desempenham papéis cruciais em todos os estágios do projeto.  

Assegurar uma gestão eficiente do projeto é imprescindível para alcançar resultados positivos. A equipe ideal é composta por membros comprometidos com objetivos compartilhados, trabalhando em conjunto com foco e colaboração para atingir os resultados desejados. Descrição da Equipe: 

 Desenvolvedores Pleno: Leonardo Buck, Leonardo Lima, Thiago Gomes da Silva 

 Desenvolvedor Sênior: Joe Monteiro de Sousa, Thaís Cristine Santana Oliveira 

 Gerente de Projeto: Thaís Cristine Santana Oliveira 

 

## Papéis e responsabilidades 

Desenvolvedores: executar o escopo elicitado e alvo da solução do projeto. Caberá aos desenvolvedores, as tarefas de criar e corrigir todo o código necessário para que a aplicação proposta funcione corretamente na utilização dos usuários 

Analista de Teste: realizar todos os testes necessários que atestem a qualidade do código desenvolvido, identificar bugs que devem ser corrigidos e respaldar a solução de possíveis problemas pós a sua entrega 

Gerente do Projeto: ser o facilitador da equipe, de modo a que todos os impedimentos, problemas e riscos, possam ser mitigados não impactando a qualidade dos entregáveis conforme os requisitos elicitados. 

 

## Gestão de Orçamento 

Projeto é estimado para ser realizado durante 7 meses, abaixo, temos a representação do custo orçado para o projeto, atendendo todas as suas demandas. 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/115894941/f00dce8b-34c0-4eaa-b59b-3022db470edf)
