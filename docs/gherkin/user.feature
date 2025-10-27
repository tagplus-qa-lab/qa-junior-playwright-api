Feature: Users
  As a QA
  I want to validate the Users API endpoints
  So that CRUD operations work as expected

  Scenario: TC-USER-001 GET /users deve retornar uma lista de usuários
    Given que a API GoRest está disponível
    When envio uma requisição GET para "/users"
    Then o status da resposta deve ser 200
    And a resposta deve ser uma lista de usuários válida de acordo com o schema

  Scenario: TC-USER-002 POST /users deve criar um usuário
    Given que possuo um token válido de autenticação
    When envio uma requisição POST para "/users" com dados válidos
    Then o status da resposta deve ser 201
    And o usuário criado deve corresponder aos dados enviados
    And o usuário deve ser válido de acordo com o schema

  Scenario: TC-USER-003 PUT /users/:id deve atualizar um usuário
    Given que possuo um token válido e um usuário existente
    When envio uma requisição PUT para "/users/:id" com novos dados
    Then o status da resposta deve ser 200
    And os dados do usuário retornado devem corresponder aos novos dados
    And o usuário atualizado deve ser válido de acordo com o schema

  Scenario: TC-USER-004 DELETE /users/:id deve deletar um usuário
    Given que possuo um token válido e um usuário existente
    When envio uma requisição DELETE para "/users/:id"
    Then o status da resposta deve ser 204
    And o usuário deve ser deletado com sucesso