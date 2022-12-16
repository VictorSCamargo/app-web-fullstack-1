# trab-prog-web

Prototipo de forum para compartilhamento de postagens, semelhante ao Twitter, implementando algumas funcionalidades "CRUD" (Create, Read, Update, Delete).

Utiliza-se para o frontend: ReactJS.
Utiliza-se para o backend: NodeJS com express e MongoDB.

## Como executar localmente

### Frontend
Abra o terminal no diretorio 'login' e execute o comando `npm install`.
Em seguida, `npm start`.
Acesse a pagina inicial da aplicacao por meio do link [http://localhost:3000/login] .

### Backend
Abra o terminal no diretorio e execute o comando `npm install`.
Em seguida, levando em consideração o servidor corretamente configurado, execute `npm start`.

### Detalhes sobre como rodar em um servidor da UFSC
Levando em conta que voce tem acesso ao servidor UFSC (estudante ou professor), pode ser necessário adaptar as URLs dos fetchs. Alem disso, para rodar continuamente a aplicação, execute, nas mesmas pastas citadas anteriormente, o comando `forever start -c "npm start" /path/to/app/dir/`. Pode ser necessario instalar dependencias diversas.

Pedro Mandelli, Pedro Pereira, Victor Camargo
