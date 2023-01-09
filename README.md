# App Web - Fórum simplificado de postagens 

Protótipo de fórum para compartilhamento de postagens, semelhante ao Twitter, com sistema de login, registro, alteração de senha e a página para realização e visualização de postagens.

Projeto em desenvolvimento para fins didáticos e desenvolvimento de habilidades pessoais.

Iniciado durante a disciplina de programação web do cursos de Sistemas de Informação da UFSC.

## Habilidades aplicadas

Utiliza-se para o **frontend**:
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) com [ReactJS](https://pt-br.reactjs.org/) framework;
- [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS) nativo para estilização;
- [Jest](https://jestjs.io/) com [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para testagem.

Há duas opções construídas para o **backend**:
- [Node.js](https://nodejs.org/en/) com [Express](http://expressjs.com/) e [MongoDB](https://www.mongodb.com/home) remoto;
- [Java 8](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) com [Springboot](https://spring.io/projects/spring-boot) e banco de dados local gerenciado por [ProstgreSQL](https://www.postgresql.org/).

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