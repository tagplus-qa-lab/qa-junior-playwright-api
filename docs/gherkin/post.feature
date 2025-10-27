Feature: Posts
  As a QA
  I want to validate the Posts API endpoints
  So that CRUD operations work as expected

  Scenario: TC-POST-001 GET /posts deve retornar uma lista de posts
    Given que a API GoRest está disponível
    When envio uma requisição GET para "/posts"
    Then o status da resposta deve ser 200
    And a resposta deve ser uma lista de posts válida de acordo com o schema

  Scenario: TC-POST-002 POST /posts deve criar um post
    Given que possuo um token válido e um usuário existente
    When envio uma requisição POST para "/posts" com dados válidos
    Then o status da resposta deve ser 201
    And o post criado deve corresponder aos dados enviados
    And o post deve ser válido de acordo com o schema

  Scenario: TC-POST-003 PUT /posts/:id deve atualizar um post
    Given que possuo um token válido e um post existente
    When envio uma requisição PUT para "/posts/:id" com novos dados
    Then o status da resposta deve ser 200
    And os dados do post retornado devem corresponder aos novos dados
    And o post atualizado deve ser válido de acordo com o schema

  Scenario: TC-POST-004 DELETE /posts/:id deve deletar um post
    Given que possuo um token válido e um post existente
    When envio uma requisição DELETE para "/posts/:id"
    Then o status da resposta deve ser 204
    And o post deve ser deletado com sucesso