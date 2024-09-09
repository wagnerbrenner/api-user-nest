# API de Usuários

Este projeto é uma API de usuários desenvolvida em **Node.js** utilizando o framework **Nest.js**. A API permite realizar operações **CRUD** (Create, Read, Update, Delete) em um banco de dados **Postgres**.

## Opções de Execução

### 1. Rodar com Docker (Recomendado)

Para facilitar o setup do projeto, você pode rodar tanto a API quanto o banco de dados em contêineres Docker.

#### Passos:

1. Clone o repositório para o seu ambiente local:

   ```
   git clone https://github.com/wagnerbrenner/api-user-nest
   ```

2. Navegue até o diretório do projeto:

    ```
    cd seu-projeto
    ```

3. Execute o comando abaixo para iniciar a aplicação e o banco de dados Postgres em contêineres Docker:

    ```
    docker-compose up --build
    ```
    Esse comando irá:

    *   Subir o contêiner da API na porta 8080.
    *   Subir o contêiner do banco de dados Postgres na porta 5432.

4. Acesse a API e a documentação Swagger em:

    ```
    http://localhost:8080/api
    ```

*Para parar os contêineres, use:
    ```
    docker-compose down
    ```

### 2. Rodar Localmente (Sem Docker)

    Se preferir rodar a aplicação localmente sem Docker, siga os passos abaixo:

#### Passos:
1. Clone o repositório para o seu ambiente local:

    ```
    git clone https://github.com/wagnerbrenner/api-user-nest
    ```
2. Navegue até o diretório do projeto:

    ```
    cd seu-projeto
    ```
3. Instale as dependências:

    ```
    npm install
    ```

4. Configure o banco de dados:

* Crie um arquivo chamado .env.development.local na raiz do projeto e adicione as seguintes variáveis de ambiente:

    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_DATABASE=api-user
    ```
5. Suba o banco de dados Postgres localmente (caso não esteja usando Docker) ou conecte-se a um banco Postgres já existente.

6. Execute o projeto:
    ```
    npm run start:dev
    ```
7. Acesse a API e a documentação Swagger em:
    ```
    http://localhost:8080/api
    ```

## Banco de Dados
    Este projeto utiliza PostgreSQL como banco de dados para armazenar as informações dos usuários. Certifique-se de configurar corretamente as variáveis de ambiente no arquivo .env.development.local para conectar ao banco de dados.

### Exemplo de configuração .env.development.local:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_DATABASE=api-user
    ```


## Documentação da API (Swagger)
    Este projeto utiliza o Swagger para documentar os endpoints da API.

### Acesso à documentação:
    Após iniciar a aplicação (seja via Docker ou localmente), abra o navegador e acesse:

    ```
        http://localhost:8080/api
    ```
Você verá uma interface amigável onde poderá testar os endpoints e visualizar detalhes como parâmetros, respostas e exemplos de uso.

## Testes Unitários
    Este projeto inclui testes unitários para garantir a qualidade do código.

### Para executar os testes e monitorar alterações:

    ```
    npm run test:watch
    ```

### Para executar os testes e obter a cobertura de código:
    ```
    npm run test:cov
    ```

* Esses comandos irão executar os testes definidos e mostrar a cobertura de código.