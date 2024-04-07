# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="03-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

![DiagramaClassesEasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/06b12c31-02fb-4a31-87cd-99415d770839)


<br>

## Modelo ER

![REM EasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/99a5a042-403f-43eb-b4f1-f205260e94df)

<br>

## Esquema Relacional

Foi utilizado um sistema de banco de dados relacionado, para implementação do microserviço 03. 

![ER-EasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/110863413/d564d9fe-0861-4dd4-8966-9a6fd281e71c)

<br>

## Modelo Físico

- **Microserviço 01**

Foi utilizado um sistema de banco de dados NoSQL orientado a documentos, o MongoDB, para implementação do microserviço 01. 

![Mongosh](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/15f5fdd6-1bc8-45d8-b7f7-905cfcfa255c)

<br>

- **Microserviço 03**
  
Scripts de criação da tabela do banco de dados para o microserviço 03.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/110863413/7ea5b70e-7440-44b5-ada9-23a4c122c90f)


<br>

## Tecnologias Utilizadas

Foram utilizadas as seguintes tecnologias:

- Microsoft Visual Studio
- Microsoft Visual Studio Code
- MySQL
- MongoDB
- Miro
- Canva
- drawio.com
- Insomnia

<br>

## Hospedagem

A Hospedagem da aplicação web utilizará o [GitHub Pages](https://pages.github.com/)

<br>

## Qualidade de Software

Com o objetivo de padronizar a avaliação da qualidade do sowftware no nosso projeto, vamos seguir os padrões da norma ISO/IEC 9216 - com a atualização conferida pela norma ISO/IEC 25010 - que propõe atributos de qualidade distribuídos em características principais e em subcaracteristicas:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/110863413/e80bbdc8-83bf-4a5a-8764-3fb88d9f2f16)

<br>

**Funcionalidade:**

 - *Interoperabilidade*: Sitema é capaz de interagir e operar com um ou mais sistemas especificados.

**Usabilidade:**

 - *Inteligibilidade*: Aplicação construída de forma a facilitar o acesso dos usuários frente a demandas específicas.
 - *Interface de Usuário*: UI do sistema construída para que sua interface traga atração visual ao usuário, sendo agradável e adequada ao seu contexto de uso.

**Manutenibilidade:**

- *Modificabilidade*: Sistema cumpre esse critério através da implementação e ajuste de funcionalidades.

<br>

## Estilo arquitetural de microserviços

![Arquitetura da solução EasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/bef01e60-e587-4660-83a6-71d2b7a7eddd)


`MS-01`
- ***RF-01*** Sistema deve permitir o cadastro, edição e deletar imóveis, incluindo fotos, localização, características específicas, status de locação.
- ***RF-02*** Sistema dever permitir a alteração do status da locação do imóvel: disponível, alugado, em manutenção.

`MS-02`
- ***RF-03***	Facilitar o gerenciamento de contratos de locação, incluindo dados dos locatários, prazos, valores e datas de pagamento.
- ***RF-04***	Deve ser possível ter acesso a documentos digitalizados, tais como: contratos, termos de vistoria, e outros documentos relevantes a locação.
- ***RF-06***	Sistema deve disponibilizar relatórios gerenciais.

`MS03`
- ***RF-05***	Deve haver um controle financeiro para acompanhamento de receitas (aluguéis) e despesas (manutenções, impostos, taxas de serviço), incluindo alertas para pagamentos pendentes ou atrasados.

`MS-04`
- ***RF-07***	Sistema deve ter um perfil admin, que será responsável pela gestão da aplicação, além de criar os acessos dos locatários para que estes possam visualizar todas as informações sobre sua locação.
- ***RF-08***	Sistema deve ter um perfil usuário, que será responsável por inserir e gerenciar os imóveis lançados na aplicação.
- ***RF-09***	Sistema deve ter um perfil locador, que visualizará todas as informações sobre o seu imóvel locado.

`MS-05`
- ***RF-10*** Deve haver uma sistema de notificação dentro da aplicação
