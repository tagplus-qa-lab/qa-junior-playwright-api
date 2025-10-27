# Documentação de Testes de Integração - GoRest API

## Índice
1. [Users](#users)
2. [Posts](#posts)
3. [Comments](#comments)

---

## Users

### TC-USER-001: GET /users deve retornar uma lista de usuários
**Objetivo:** Validar que a API retorna corretamente a lista de usuários e que cada usuário está conforme o schema.  

**Pré-condição:**  
- Ter acesso à API GoRest.  

**Passos:**  
1. Enviar requisição GET para `/users`.  
2. Validar o status da resposta (`200`).  
3. Validar se o retorno é uma lista (`Array`).  
4. Validar cada usuário utilizando o schema `userSchema`.  

**Resultado esperado:**  
- Retorno com status `200`.  
- Lista de usuários válida de acordo com o schema.

---

### TC-USER-002: POST /users deve criar um usuário
**Objetivo:** Validar que a API consegue criar um usuário com os dados fornecidos.  

**Pré-condição:**  
- Ter token válido de autenticação.  

**Passos:**  
1. Enviar requisição POST para `/users` com dados válidos de um usuário.  
2. Validar status da resposta (`201`).  
3. Validar se o usuário retornado corresponde aos dados enviados.  
4. Validar o usuário criado pelo schema `userSchema`.  

**Resultado esperado:**  
- Usuário criado com sucesso.  
- Status da resposta `201`.  
- Usuário retornado válido de acordo com o schema.

---

### TC-USER-003: PUT /users/:id deve atualizar um usuário
**Objetivo:** Validar que a API consegue atualizar os dados de um usuário existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um usuário existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição PUT para `/users/:id` com novos dados.  
2. Validar status da resposta (`200`).  
3. Validar se os dados retornados correspondem aos novos dados enviados.  
4. Validar usuário atualizado com `userSchema`.  

**Resultado esperado:**  
- Usuário atualizado com sucesso.  
- Status da resposta `200`.  
- Dados validados pelo schema.

---

### TC-USER-004: DELETE /users/:id deve deletar um usuário
**Objetivo:** Validar que a API consegue deletar um usuário existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um usuário existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição DELETE para `/users/:id`.  
2. Validar status da resposta (`204`).  

**Resultado esperado:**  
- Usuário deletado com sucesso.  
- Status da resposta `204`.  

---

## Posts

### TC-POST-001: GET /posts deve retornar uma lista de posts
**Objetivo:** Validar que a API retorna corretamente a lista de posts e que cada post está conforme o schema.  

**Pré-condição:**  
- Ter acesso à API GoRest.  

**Passos:**  
1. Enviar requisição GET para `/posts`.  
2. Validar status da resposta (`200`).  
3. Validar se o retorno é uma lista (`Array`).  
4. Validar cada post pelo schema `postSchema`.  

**Resultado esperado:**  
- Lista de posts retornada com sucesso.  
- Status da resposta `200`.  
- Posts válidos de acordo com o schema.

---

### TC-POST-002: POST /posts deve criar um post
**Objetivo:** Validar que a API consegue criar um post com os dados fornecidos.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um usuário existente (`user_id`).  

**Passos:**  
1. Enviar requisição POST para `/posts` com dados válidos.  
2. Validar status da resposta (`201`).  
3. Validar se o post retornado corresponde aos dados enviados.  
4. Validar post criado pelo schema `postSchema`.  

**Resultado esperado:**  
- Post criado com sucesso.  
- Status da resposta `201`.  
- Dados do post válidos de acordo com o schema.

---

### TC-POST-003: PUT /posts/:id deve atualizar um post
**Objetivo:** Validar que a API consegue atualizar um post existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um post existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição PUT para `/posts/:id` com novos dados.  
2. Validar status da resposta (`200`).  
3. Validar se os dados retornados correspondem aos dados enviados.  
4. Validar post atualizado pelo schema `postSchema`.  

**Resultado esperado:**  
- Post atualizado com sucesso.  
- Status da resposta `200`.  
- Dados validados pelo schema.

---

### TC-POST-004: DELETE /posts/:id deve deletar um post
**Objetivo:** Validar que a API consegue deletar um post existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um post existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição DELETE para `/posts/:id`.  
2. Validar status da resposta (`204`).  

**Resultado esperado:**  
- Post deletado com sucesso.  
- Status da resposta `204`.

---

## Comments

### TC-COMMENT-001: GET /comments deve retornar uma lista de comentários
**Objetivo:** Validar que a API retorna corretamente a lista de comentários e que cada comentário está conforme o schema.  

**Pré-condição:**  
- Ter acesso à API GoRest.  

**Passos:**  
1. Enviar requisição GET para `/comments`.  
2. Validar status da resposta (`200`).  
3. Validar se o retorno é uma lista (`Array`).  
4. Validar cada comentário pelo schema `commentSchema`.  

**Resultado esperado:**  
- Lista de comentários retornada com sucesso.  
- Status da resposta `200`.  
- Comentários válidos de acordo com o schema.

---

### TC-POST-002: POST /comments deve criar um comentário
**Objetivo:** Validar que a API consegue criar um comentário com os dados fornecidos.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um post existente (`post_id`).  

**Passos:**  
1. Enviar requisição POST para `/comments` com dados válidos.  
2. Validar status da resposta (`201`).  
3. Validar se o comentário retornado corresponde aos dados enviados.  
4. Validar comentário criado pelo schema `commentSchema`.  

**Resultado esperado:**  
- Comentário criado com sucesso.  
- Status da resposta `201`.  
- Dados válidos de acordo com o schema.

---

### TC-COMMENT-003: PUT /comments/:id deve atualizar um comentário
**Objetivo:** Validar que a API consegue atualizar um comentário existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um comentário existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição PUT para `/comments/:id` com novos dados.  
2. Validar status da resposta (`200`).  
3. Validar se os dados retornados correspondem aos dados enviados.  
4. Validar comentário atualizado pelo schema `commentSchema`.  

**Resultado esperado:**  
- Comentário atualizado com sucesso.  
- Status da resposta `200`.  
- Dados validados pelo schema.

---

### TC-COMMENT-004: DELETE /comments/:id deve deletar um comentário
**Objetivo:** Validar que a API consegue deletar um comentário existente.  

**Pré-condição:**  
- Ter token válido de autenticação.  
- Ter um comentário existente (pegar `id` aleatório).  

**Passos:**  
1. Enviar requisição DELETE para `/comments/:id`.  
2. Validar status da resposta (`204`).  

**Resultado esperado:**  
- Comentário deletado com sucesso.  
- Status da resposta `204`.
