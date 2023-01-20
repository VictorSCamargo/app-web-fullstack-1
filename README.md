# App Web - Fórum simplificado de postagens 

### Imagens e vídeo do projeto

Imagens exemplo na [pasta de imagens](imagens/). Há, também, o [vídeo entregue durante a disciplina de programação web](https://youtu.be/cDKEfB4eEh8), que está desatualizado. Porém mostra as funcionalidades gerais. A entrega referida no vídeo encontra-se em [outra branch](https://github.com/VictorSCamargo/app-web-fullstack-1/tree/entrega-disciplina-web-2022-2).

Projeto em desenvolvimento para fins didáticos e desenvolvimento de habilidades pessoais.

### O que é

Protótipo de fórum para compartilhamento de postagens, semelhante ao Twitter, com sistema de login, registro, alteração de senha e a página para realização e visualização de postagens.

## Habilidades aplicadas

Utiliza-se para o **frontend**:
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) com [ReactJS](https://pt-br.reactjs.org/) framework;
- [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS) nativo para estilização;
- [Jest](https://jestjs.io/) com [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para testagem.

Há duas opções construídas para o **backend**:
- [Java 8](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) com [Springboot](https://spring.io/projects/spring-boot), banco de dados local gerenciado por [ProstgreSQL](https://www.postgresql.org/), e [JUnit 5](https://junit.org/junit5/) para
criação de testes de unidade e integração;
- [Node.js](https://nodejs.org/en/) com [Express](http://expressjs.com/) e [MongoDB](https://www.mongodb.com/home) remoto;

A opção de backend feita com Javascript é mais simples de ser executada pois possui menos requisitos, facilitando a testagem do frontend.

## Funcionalidades e detalhes de regra de projeto

- Há preocupação com a página de postagens ser acessível apenas após autenticação por meio do login (sem estar logado ela não renderiza e redireciona o usuário à página de login);
- Há limitações de caracteres, checagens de campo vazio e checagens de campos com valores que não batem;
- A comunicação com o backend pode retorna mensagens customizadas que são impressas no HTML da aplicação;
- Testes de unidade que verificam componentes e simulam interação do usuário com as páginas do frontend e métodos fetch;
- Testes de unidade e de integração no backend com Springboot.

## Como executar localmente

### Frontend
- Abra o arquivo `BackendPaths.js` que se encontra no diretório [src/frontend/app/src/hooks/BackendPaths] e selecione a URL para o backend de acordo com a opção de backend que deseja utilizar;
- Abra o terminal no diretório `frontend/app`;
- Execute o comando `npm install` para instalar dependências;
- Em seguida, `npm start` para iniciar a aplicação;
- Acesse-a por meio do link http://localhost:3000/ .

### Backend
#### Opção 1: node.js com express e MongoDB
- Tenha [Node.js](https://nodejs.org/en/) instalado;
- Abra o terminal no diretorio [src/backend/op-1-js-express-e-mongodb] e execute o comando `npm install` para instalar dependências;
- Em seguida, `npm start`.

Não há preocupação em configurar o banco de dados MongoDB, pois roda remotamente em um servidor.

#### Opção 2: Java com springboot e PostgreSQL

Recomenda-se a utilização do [IntelliJ](https://www.jetbrains.com/pt-br/idea/) para facilitar a construção do projeto.

- Abra o diretório [src/backend/springboot-postgresql] com [IntelliJ](https://www.jetbrains.com/pt-br/idea/). A IDE deverá instalar dependências automaticamente e facilitará a execução da aplicação;
- Tenha instalado o [Java JDK 8](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) e configure a IDE para buildar o projeto com o Java 8 (SDK 1.8);
- Tenha instalado [ProstgreSQL](https://www.postgresql.org/);
- Acesse o diretorio `src/backend/springboot-postgresql/src/main/resources` e edite o arquivo `application.properties`. Altere as linhas `spring.datasource.username` e `spring.datasource.password`, colocando os dados de acesso ao PostgreSQL instalado no seu computador;
- Construa a aplicação com o IntelliJ IDE e execute-a.

A aplicação está configurada para gerar um banco de dados local novo automaticamente sempre que iniciada, para facilitar execução.

## Testagem

Há [imagens exemplo de testes na pasta de imagens](imagens/exemplo_testes/), tanto para o frontend quanto para o backend.

### Como executar testes de unidade e integração

#### Frontend (Jest)

Não é necessário ter o backend rodando. As interações com backend são simuladas.

- Abra o terminal no diretório `frontend/app`;
- Execute o comando `npm install` para instalar dependências;
- Em seguida, `npm test -- --verbose` para executar rotina de testes completa e mostrar detalhes.

Os resultados podem ser visualizados no terminal.

#### Backend em Java 8 (Junit 5)

Com o IntelliJ no diretório da aplicação em Java, navegue para [src\test\java\com\example\demo]. A partir daí, verifique e execute os testes desejados.
