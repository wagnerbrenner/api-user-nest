# API de Usuários

Este projeto é uma API de usuários desenvolvida em Node.js utilizando o framework Nest.js. A API permite realizar operações CRUD (Create, Read, Update, Delete) em um banco de dados Postgres.

## Comandos

Para executar este projeto, siga os passos abaixo:

1. Clone o repositório para o seu ambiente local:

```
git clone https://github.com/seu-usuario/seu-projeto.git
```

2. Navegue até o diretório do projeto:

```
cd seu-projeto
```

3. Instale as dependências:

```
npm install
```

4. Execute o projeto:

```
npm run start:dev
```

## Banco de Dados

Este projeto utiliza um banco de dados Postgres para armazenar as informações dos usuários. O tipo de banco de dados utilizado pode variar de acordo com a configuração do projeto.

Para configurar o banco de dados, siga os passos abaixo:

1. Crie um arquivo chamado `.env.development.local` na raiz do projeto.

2. Dentro do arquivo `.env.development.local`, adicione as seguintes variáveis de ambiente:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_DATABASE=nome-do-banco
```

Certifique-se de substituir `seu-usuario`, `sua-senha` e `nome-do-banco` pelas informações corretas do seu banco de dados.

3. Salve o arquivo `.env.development.local`.

Agora o projeto está configurado para utilizar o banco de dados Postgres.

## Swagger

Este projeto utiliza o Swagger para documentar a API. Para acessar a documentação, siga os passos abaixo:

1. Após executar o projeto, abra o seu navegador e acesse o seguinte endereço:

```
http://localhost:8080/api
```

2. A documentação da API será exibida, contendo informações sobre os endpoints disponíveis, parâmetros, respostas e exemplos de requisições.

## Testes Unitários

Este projeto possui uma camada de testes unitários para garantir a qualidade do código. Para executar os testes unitários e obter a cobertura de código, utilize o seguinte comando:

```
npm run test:cov
```

Isso irá executar os testes e ficar monitorando os arquivos do projeto em busca de alterações. Sempre que um arquivo for modificado, os testes serão executados automaticamente.

Certifique-se de ter todas as dependências instaladas antes de executar os comandos acima.- Para executar os testes unitários e obter a cobertura de código, utilize o seguinte comando:

```
npm run test:watch
```
