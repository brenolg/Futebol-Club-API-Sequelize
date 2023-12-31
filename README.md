# Futebol Club API 

O projeto Futebol Club consiste em desenvolver uma API utilizando a metodologia TDD (Desenvolvimento Orientado por Testes) e integrar as aplicações front-end e back-end usando o Docker Compose. A API será consumida por um front-end já disponibilizado, que exibirá informações sobre partidas e classificações de futebol.

O objetivo principal do projeto é aplicar todos os conhecimentos adquiridos até o momento, incluindo a dockerização das aplicações, a modelagem de dados com MySQL usando o Sequelize, a criação e associação de tabelas, a construção de uma API REST com endpoints para consumir os modelos criados e a implementação de um CRUD com TypeScript utilizando o ORM.

Como responsável pelo desenvolvimento do back-end dockerizado, você utilizou os princípios de Programação Orientada a Objetos (POO) e os princípios SOLID para garantir a qualidade do código. Além disso, foi implementada a autenticação com JWT (JSON Web Token) para algumas rotas que exigem permissão, garantindo que apenas usuários autenticados possam fazer alterações.

No geral, o projeto busca simular um cenário real, onde é necessário integrar o front-end e o back-end, utilizando um banco de dados relacional e seguindo as regras de negócio estabelecidas. O resultado final será uma API funcional que fornecerá os dados necessários para o front-end exibir as informações de forma adequada aos usuários.

## Funcionalidades

- Dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM;
- Autenticação de rotas utilizando JWT.
- Programação Orientada a Objetos e princípios SOLID:
- Implementar, em TypeScript: `Classes`, `Instâncias`, `Atributos` e `Métodos`.

# Tecnologias utilizadas


- React js  
- TypeScript
- Node.js
- Express.js
- Sequelize
- JSON Web Token (JWT)
- Bcrypt.js 
  ### **Testes**
    - Mocha
    - Chai
    - Sinon

## Banco de Dados
<details close>
    <summary><strong> Diagrama e Tabelas</strong></summary>

  - MySQL 
  1. #### **Diagrama ER**
<img src="./database.png"/>         

  2. #### **Seeders**  
  O banco de dados contém:
  - tabela `users` com usuários válidos com hash das senhas e alguns inválidos, estes útimos utilizados para os testes avaliativos.
  - tabela `teams` com a lista de todos os times que estão participando do campeonato.
  - tabela `matches` com algumas partidadas finalizadas e outras em andamento.
 </details>

## Documentação da API

<details close>
      <summary><strong> Visão geral</summary>

| Endpoint     | Método HTTP | Descrição               | 
| :----------- | :---------- | :---------------------- |
| [`/login`](#endpoint-login)   | POST        | Faz o login com usuários do banco de dados 
| [`/login/role`](#endpoint-loginrole)| GET         | :closed_lock_with_key: Retorna o *role* do usuário logado (user ou adm)  |
| [`/teams`](#endpoint-teams)     | GET         | Retorna todos os times do campeonato
| [`/teams/:id`](#parâmetro-id-teamsid) | GET         | Retorna o time especificado no id
| [`/matches`](#endpoint-matches)   | GET         | Retorna todas as partidas 
| [`/matches`](#endpoint-matches)           | POST         | :closed_lock_with_key: Insere uma nova partida em andamento.
| [`/matches?inProgress=true`](#parâmetro-inprogress-matchesinprogress) | GET         | Retorna as partidas em andamento.
| [`/matches?inProgress=false`](#parâmetro-inprogress-matchesinprogress)| GET         | Retorna as partidas finalizadas.
| [`/matches/:id`](#parâmetro-id-matchesid)    | PATCH       | :closed_lock_with_key: Atualiza a partida de acordo com seu id.
| [`/matches/:id/finish`](#endpoint-matchesidfinish) | PATCH       | :closed_lock_with_key: Finaliza uma partida em andamento.
| [`/leaderboard`](#endpoint-leaderboard)       | GET          | Retorna a classificação geral do campeonato.
| [`/leaderboar/home`](#endpoint-leaderboardhome)   | GET          | Retorna a classificação dos times mandantes.
| [`/leaderboard/away`](#endpoint-leaderboardaway)  | GET          | Retorna a classificação dos times visitantes.

:closed_lock_with_key: : Necessário que o `token` gerado no login seja enviado no headers como _"Authorization"_.
 </details>
  


### **Corpo das requisições e respostas**  
> *Clique nas setas para ver mais*  

#### **Endpoint:** `/login`  

- <details><summary>Método POST </summary>  
  Exemplo de corpo da requisção válido  

    ```json
    {
      "email": "user@user.com",
      "password": "secret_user", 
    }
    ```  

  Respostas 
  - Status: 200 OK  
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // jsonwebtoken gerado
    }
    ```
    
  - Status: 400 Bad Request
    ```json
    { "message": "All fields must be filled" }
    ```
    
  - Status: 401 Unauthorized
    ```json
    { "message": "Invalid email or password" }
    ```
</details>

#### **Endpoint:** `/login/role`
- <details><summary>:closed_lock_with_key: Método GET</summary>  
  Respostas  
    - Status: 200 OK  
      ```json
      { "role": "admin" }
      ```
      
    - Status: 401 Unauthorized
      ```json
      { "message": "Token not found" }
      ```

      ```json
      { "message": "Token must be a valid token" }
      ```
</details>

#### **Endpoint:** `/teams`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      ...
    ]
    ```
</details>

#### **Parâmetro id:** `/teams/:id`
- <details> <summary>Método GET</summary>

  Resposta 
  - Status: 200 OK  
    ```json
    {
      "id": 5,
      "teamName": "Cruzeiro"
    }
    ```
</details>

#### **Endpoint:** `/matches`
- <details><summary>Método GET</summary>

  Resposta 
  - Status: 200 OK  
    ```json
      [
        {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        },
        ...
        {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
      ]
    ```
</details>

- <details><summary>:closed_lock_with_key: Método POST</summary>
  Requisição  

  ```json
  {
    "homeTeamId": 16, // O valor deve ser o id do time
    "awayTeamId": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 1,
  }
  ```

  Respostas 
  - Status: 201 Created  
    ```json
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
    }
    ```
  
  - Status: 401 Unauthorized
    ```json
    { "message": "Token not found" }
    ```

    ```json
    { "message": "Token must be a valid token" }
    ```
  - Status: 404 Not Found
    ```json
    { "message": "There is no team with such id!" }
    ```
  - Status: 422 Unprocessable Entity
    ```json
    { "message": "It is not possible to create a match with two equal teams" }
    ```
</details>  


#### **Parâmetro inProgress:** `/matches?inProgress=`
- <details>
  <summary>Método GET</summary>
  Opções de query: <i>true</i> ou <i>false</i>  

  Ex:  
    ```
    matches?inProgress=true
    ```

  Resposta 
  - Status: 200 OK  
    ```json
    [
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      }
    ]
    ```
</details>

#### **Parâmetro id:** `/matches/:id`
- <details><summary>:closed_lock_with_key: Método PATCH</summary>
 
  Requisição:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

  Respostas 
  - Status: 200 OK  
    ```json
    { "message": "Updated match!" } 
    ```
  
  - Status: 401 Unauthorized
    ```json
    { "message": "Token not found" }
    ```

    ```json
    { "message": "Token must be a valid token" }
    ```
</details>

#### **Endpoint:** `/matches/:id/finish`
- <details><summary>:closed_lock_with_key: Método PATCH</summary>
  Respostas  

    - Status: 200 OK  
      ```json
        { "message": "Finished" }
      ```
    
    - Status: 401 Unauthorized
      ```json
        { "message": "Token not found" }
      ```

      ```json
        { "message": "Token must be a valid token" }
      ```
</details>

#### **Endpoint:** `/leaderboard`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
        ...
      {
        "name": "Napoli-SC",
        "totalPoints": 2,
        "totalGames": 6,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 4,
        "goalsFavor": 3,
        "goalsOwn": 15,
        "goalsBalance": -12,
        "efficiency": "11.11"
      }
    ]
    ```
</details>

#### **Endpoint:** `/leaderboard/home`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      ...
      {
        "name": "Bahia",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 0,
        "goalsOwn": 4,
        "goalsBalance": -4,
        "efficiency": "0.00"
      }
    ]
    ```
</details>

#### **Endpoint:** `/leaderboard/away`
- <details><summary>Método GET</summary>

  Resposta  
  - Status: 200 OK
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
        ...
      {
        "name": "Napoli-SC",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 1,
        "goalsOwn": 10,
        "goalsBalance": -9,
        "efficiency": "0.00"
      }
    ]
    ```
</details>  
</details>


## Instalando localmente

Caso deseje contribuir ou simplesmente rodar o projeto na sua máquina, siga as orientações: 

. Clone o repositório   
  `git clone git@github.com:brenolg/Futebol-Club-API-Sequelize.git`

. Instale as dependências no diretório raiz  
  `npm install`

### **Docker**
1. Na raíz do projeto rode o comando:  
  `npm run compose:up`  
2. Em seguida abra o terminal interativo do container:  
  `docker exec -it app_backend sh`  
3. Instale as dependências dentro do container:  
  `npm install`

### **Rodando os testes**
Para rodar os testes de integração desenvolvidos por mim, entre na pasta backend e rode o comando:  
- `npm test`

## Requisitos
> *Clique na seta para ver a lista de requisitos.*

<details><summary><strong>Docker</strong></summary> 

Configuração dos `dockerfiles` referente ao front e back-end, para integrar as aplicações através do docker-compose, para que elas funcionem consumido o banco de dados.
</details>

<details><summary><strong>Fluxo Teams</strong></summary> 

1. Desenvolva uma migration e um model para a tabela de times, utilizando Sequelize.  
2. `(TDD)` Desenvolva testes de integração do back-end referente a implementação do requisito seguinte.  
3. Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar a lista com **todos os times** corretamente.  
4. `(TDD)` Evolua os testes de integração da sua rota /teams, agora considerando o contrato do próximo requisito.  
5. Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de **um time específico**.  
</details>

<details><summary><strong>Fluxo User e Login</strong></summary> 

6. Desenvolva uma migration e um model para a tabela de pessoas usuárias, utilizando Sequelize.
7. `(TDD)` Desenvolva testes baseando-se no contrato do endpoint `/login` do próximo requisito.
8. Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com preenchimento obrigatório de `email` e `password` no front-end e retorne um **`token`**.  
9. `(TDD)` Evolua os testes de integração da sua rota` /login`, agora considerando o contrato do próximo requisito.
10. Desenvolva o endpoint` /login` no back-end de maneira que ele **não permita o acesso** com dados inválidos ou não cadastrados no banco de dados, considerando:
    - As senhas que existem no banco de dados estão encriptadas.
11. `(TDD)` Desenvolva testes baseando-se no contrato do endpoint `/login/role` do próximo requisito.
12. Desenvolva um middleware de **validação para o `token`**, verificando se ele é válido, e desenvolva o endpoint `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end.
    - :warning: A rota deve recebe um header com parâmetro authorization, onde ficará armazenado o `token` gerado no login; 
</details>

<details><summary><strong>Fluxo Matches</strong></summary> 

13. Desenvolva uma migration e um model para a tabela de partidas, utilizando Sequelize.
14. `(TDD)` Desenvolva teste de integração, agora da sua rota `/matches`, considerando os contratos dos próximos requisitos.
15. Desenvolva o endpoint `/matches` de forma retorna uma lista de partidas e que todos os dados de partidas sem nenhum filtro apareçam corretamente na tela de partidas no front-end.
16. Desenvolva o endpoint `/matches` de forma que seja possível **filtrar** somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end.
    - Essa requisição deverá usar `query string` para definir o parâmetro.
17. Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível **finalizar** uma partida no banco de dados.
    - :warning: Não é possível alterar uma partida sem um `token`;
18. Desenvolva o endpoint `/matches/:id` de forma que seja possível **atualizar** partidas em andamento.
    - :warning: Não é possível atualizar uma partida sem um `token`;
19. `(TDD)` Desenvolva testes de integração, agora da sua rota `/matches`, considerando os contratos dos próximos requisitos.
20. Desenvolva o endpoint `/matches` de modo que seja possível **cadastrar** uma nova partida em andamento no banco de dados e retornar os dados inserida no banco de dados.
    - :warning: Não é possível atualizar uma partida sem um `token`;
21. Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times.
</details>

<details><summary><strong>Fluxo Leaderboards</strong></summary> 

  - <details><summary>Regras de negócio para classificação dos times</summary>

    > Todas as regras de negócio e cálculos necessários deverão ser realizados no back-end. A aplicação front-end apenas renderizará essas informações.

    - A tabela deverá renderizar **somente** as partidas que já foram FINALIZADAS.
    
    ```
    Classificação: Posição na classificação;  
    Time: Nome do time;  
    P: Total de Pontos;  
    J: Total de Jogos;  
    V: Total de Vitórias;  
    E: Total de Empates;  
    D: Total de Derrotas;  
    GP: Gols marcados a favor;  
    GC: Gols sofridos;  
    SG: Saldo total de gols;  
    %: Aproveitamento do time.  
    ```
    O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou.   
    Em caso de **empate** no `Total de Pontos`, você deve levar em consideração os seguintes **critérios para desempate**:
      - 1º Total de Vitórias;
      - 2º Saldo de gols;
      - 3º Gols a favor;

    </details>


  - <details><summary><strong>Leaderboard Home</strong></summary> 

    23. Desenvolva o endpoint `/leaderboard/home` de forma que retorne as informações do desempenho dos **times da casa** com as seguintes propriedades: `name`, `totalPoints`, `totalGames`, `totalVictories`, `totalDraws`, `totalLosses`, `goalsFavor` e `goalsOwn`.
    24. Desenvolva o endpoint `/leaderboard/home` de forma que seja possível **filtrar** as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades `goalsBalance` e `efficiency`, além das propriedades do requisito anterior.
    25. Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.
    </details>

  - <details><summary><strong>Leaderboard away</strong></summary> 
  
26. Desenvolva o endpoint `/leaderboard/away` de forma que retorne as informações do desempenho dos **times visitantes** com as mesmas propriedades do req. 23.
27. Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível **filtrar** as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades `goalsBalance` e `efficiency`, além das propriedades do requisito anterior.
28. Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.
    </details>

</details>

## Agradecimentos
Gostaria de expressar minha profunda gratidão aos monitores e à Trybe por todo o suporte e orientação ao longo do projeto. Sua dedicação, conhecimento e disposição em ajudar foram fundamentais para o meu aprendizado e crescimento profissional. Sou grato pela oportunidade de fazer parte dessa comunidade de aprendizagem e por todo o apoio recebido durante essa jornada.

