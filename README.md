# App Web - Fórum simplificado de postagens 

Protótipo de fórum para compartilhamento de postagens, semelhante ao Twitter, com sistema de login, registro, alteração de senha e a página para realização e visualização de postagens.

Imagens exemplo na [pasta de imagens](imagens/). Há, também, o [vídeo entregue durante a disciplina de programação web](https://youtu.be/cDKEfB4eEh8), que está desatualizado. Porém mostra as funcionalidades gerais. A entrega referida no vídeo encontra-se em [outra branch](https://github.com/VictorSCamargo/app-web-fullstack-1/tree/entrega-disciplina-web-2022-2).

Projeto em desenvolvimento para fins didáticos e desenvolvimento de habilidades pessoais.

## Habilidades aplicadas

Utiliza-se para o **frontend**:
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) com [ReactJS](https://pt-br.reactjs.org/) framework;
- [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS) nativo para estilização;
- [Jest](https://jestjs.io/) com [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para testagem.

Há duas opções construídas para o **backend**:
- [Node.js](https://nodejs.org/en/) com [Express](http://expressjs.com/) e [MongoDB](https://www.mongodb.com/home) remoto;
- [Java 8](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) com [Springboot](https://spring.io/projects/spring-boot) e banco de dados local gerenciado por [ProstgreSQL](https://www.postgresql.org/).

## Funcionalidades e detalhes de regra de projeto

- Há preocupação com a página de postagens ser acessível apenas após autenticação por meio do login (sem estar logado ela não renderiza e redireciona o usuário à página de login);
- Há limitações de caracteres, checagens de campo vazio e checagens de campos com valores que não batem;
- A comunicação com o backend pode retorna mensagens customizadas que são impressas no HTML da aplicação;
- Testes de unidade que verificam componentes e simulam interação do usuário com as páginas.

## Como executar localmente

### Frontend
- Abra o arquivo `BackendPaths.js` que se encontra no diretório `frontend\app\src\components\BackendPaths` e selecione a URL para o backend de acordo com a opção de backend que deseja utilizar;
- Abra o terminal no diretório `frontend/app`;
- Execute o comando `npm install` para instalar dependências;
- Em seguida, `npm start` para iniciar a aplicação;
- Acesse-a por meio do link http://localhost:3000/ .

### Backend
#### Opção 1: node.js com express e MongoDB
- Tenha [Node.js](https://nodejs.org/en/) instalado;
- Abra o terminal no diretorio `backend/op-1-js-express-e-mongodb` e execute o comando `npm install` para instalar dependências;
- Em seguida, `npm start`.

Não há preocupação em configurar o banco de dados MongoDB, pois roda remotamente em um servidor.

#### Opção 2: Java com springboot e PostgreSQL

- Abra o diretório `backend/postgresql-springboot` com [IntelliJ](https://www.jetbrains.com/pt-br/idea/). A IDE deverá instalar dependências automaticamente e facilitará a execução da aplicação;
- Tenha instalado o [Java JDK 8](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) e configure a IDE para buildar o projeto com o Java 8;
- Tenha instalado [ProstgreSQL](https://www.postgresql.org/);
- Acesse o diretorio `backend\postgresql-springboot\src\main\resources` e edite o arquivo `application.properties`. Altere as linhas `spring.datasource.username` e `spring.datasource.password`, colocando os dados de acesso ao PostgreSQL instalado no seu computador;
- Construa a aplicação com o IntelliJ IDE e execute-a.

A aplicação está configurada para gerar um banco de dados local automaticamente sempre que executada.
