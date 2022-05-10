<h1 align="center" id="top">:rocket: == TODO == :rocket:</h1>

<p align="center">
  <a href="#sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#funciona">O que funciona</a> &#xa0; | &#xa0;
  <a href="#pendente">Em desenvolvimento</a> &#xa0; | &#xa0;
  <a href="#requisitos">Pré requisitos</a> &#xa0; | &#xa0;
</p>

<h2 id="sobre">:notebook: Sobre </h2>

<p align="center">:rocket: Projeto desenvolvido para cadastramento de tarefas pelo usuário </p>

<h2 id="tecnologias"> 🛠 Tecnologias e linguagens </h2>

As seguintes bibliotecas e linguagens foram usadas na construção do projeto:

* NodeJS
* TypeScript
* MySQL
* knex
* express
* jsonwebtoken
* bcryptjs
* cors
* dotenv
* uuid

<h2 id="funciona">:heavy_check_mark: O que funciona</h2>

<h3>Back-End</h3> - <a href="https://documenter.getpostman.com/view/20822987/UyxeooLC">Link Documentação- Postman</a></br>
* {{BASE_URL}}/user/signup => Cadastrar Usuário;</br>
* {{BASE_URL}}/user/login => Fazer Login de Usuário;</br>
* {{BASE_URL}}/task/create => Cadastrar tarefas;</br>
* {{BASE_URL}}/task/done/:taskId => Colocar tarefa como feita;</br>
* {{BASE_URL}}/task/edit/:taskId => Editar Tarefa;</br>
* {{BASE_URL}}/task/userTasks => Ver tarefas do próprio usuário;</br>
* {{BASE_URL}}/user/login => Administrador pode entrar na plataforma;</br>
* {{BASE_URL}}/task/allUsersTasks => Administrador pode ver tarefas de todos os usuários;</br>
* {{BASE_URL}}/task/lateTasks => Administrador pode ver tarefas atrasadas de todos os usuários;</br>

 
<h2 id="pendente">:construction: Em desenvolvimento</h2>

- [x] Testes


<h2 id="requisitos">:leftwards_arrow_with_hook: Pré-requisitos</h2>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<h4>:checkered_flag: Rodando o projeto </h4>

```bash
# Clone este repositório

# Instale as dependências
$ npm install

# crie na pasta raiz o arquivo .env com as seguintes variáveis ambiente
DB_USER
DB_PASSWORD
DB_HOST
DB_SCHEMA 
DB_PORT
BCRYPT_COST 
JWT_KEY
ACCESS_TOKEN_EXPIRES_IN 

# Para Criar tabela no banco de dados e popular o banco
$ npm run migrations

# Para iniciar o projeto
$ npm run start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```


<a href="#top">Voltar para o topo</a>
