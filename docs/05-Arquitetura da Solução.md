# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="03-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

![DiagramaClassesEasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/06b12c31-02fb-4a31-87cd-99415d770839)



## Modelo ER

![REM EasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/99a5a042-403f-43eb-b4f1-f205260e94df)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.

As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)



## Modelo Físico

Modelo físico microsserviço 01

Foi utilizado um sistema de banco de dados NoSQL orientado a documentos, o MongoDB, para implementação do microsserviço 01. 

![Mongosh](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/15f5fdd6-1bc8-45d8-b7f7-905cfcfa255c)



## Tecnologias Utilizadas

Foram utilizadas as seguintes tecnologias:

- Microsoft Visual Studio
- Microsoft Visual Studio Code
- MongoDB
- Miro
- Canva
- drawio.com
- Insomnia

## Hospedagem

A Hospedagem da aplicação web utilizará o [GitHub Pages](https://pages.github.com/)


## Qualidade de Software

Com o objetivo de padronizar a avaliação da qualidade do sowftware no nosso projeto, vamos seguir os padrões da norma ISO/IEC 9216 - com a atualização conferida pela norma ISO/IEC 25010 - que propõe atributos de qualidade distribuídos em características principais e em subcaracteristicas:

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/110863413/e80bbdc8-83bf-4a5a-8764-3fb88d9f2f16)

**Funcionalidade:**

 - Interoperabilidade: Sitema é capaz de interagir e operar com um ou mais sistemas especificados.

**Usabilidade:**

 - Inteligibilidade: A aplicação foi construíd de forma a facilitar o acesso dos usuários frente a demandas específicas.
 - Estética da Interface de Usuário: UI dos sistem foi construída para que sua aparência traga atração visual ao usuário, sendo agradável e adequada ao contexto de uso da solução.

**Manutenibilidade:**

- Modificabilidade: O sistema cumpre esse critério através da implementação e ajuste de funcionalidades.

## Estilo arquitetural de microserviços

![Arquitetura da solução EasyRent](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-grupo02/assets/109763968/bef01e60-e587-4660-83a6-71d2b7a7eddd)
