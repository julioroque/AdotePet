# AdotePet

Requesições

**Criar um novo usuário**:
   - Método: POST
   - URL: `http://localhost:3000/users`
   - Corpo da requisição (JSON):
     ```json
     {
       "name": "Nome do Usuário"
     }
     ```
   - Enviar a requisição para criar um novo usuário.

 **Listar todos os usuários**:
   - Método: GET
   - URL: `http://localhost:3000/users`
   - Enviar a requisição para obter a lista de todos os usuários cadastrados.

 **Listar todos os animais de um usuário específico**:
   - Método: GET
   - URL: `http://localhost:3000/users/:id/pets`
   - Substituir `:id` pelo ID do usuário que deseja consultar.
   - Enviar a requisição para obter a lista de animais do usuário especificado.

**Adotar um pet**:
   - Método: POST
   - URL: `http://localhost:3000/adoptions`
   - Corpo da requisição (JSON):
     ```json
     {
       "tutorId": ID_DO_TUTOR,
       "petId": ID_DO_PET
     }
     ```
   - Substituir `ID_DO_TUTOR` pelo ID do tutor que está adotando o animal e `ID_DO_PET` pelo ID do animal que está sendo adotado.
   - Enviar a requisição para adotar o animal.

 **Listar todas as adoções**:
   - Método: GET
   - URL: `http://localhost:3000/adoptions`
   - Enviar a requisição para obter a lista de todas as adoções realizadas.

 **Listar adoções por tipo (cachorro ou gato)**:
   - Método: GET
   - URL: `http://localhost:3000/adoptions/:type`
   - Substituir `:type` por `cachorro` ou `gato`, conforme o tipo de animal desejado.
   - Enviar a requisição para obter a lista de adoções do tipo especificado.

**Criar um novo animal**:
   - Método: POST
   - URL: `http://localhost:3000/pets`
   - Corpo da requisição (JSON):
     ```json
     {
       "animal": "Tipo do Animal",
       "raca": "Raça do Animal",
       "idade": Idade_do_Animal,
       "sexo": "Sexo do Animal",
       "descricao": "Descrição do Animal"
     }
     ```
   - Enviar a requisição para criar um novo animal.

 **Listar todos os animais**:
   - Método: GET
   - URL: `http://localhost:3000/pets`
   - Enviar a requisição para obter a lista de todos os animais cadastrados.

 **Atualizar um animal**:
   - Método: PUT
   - URL: `http://localhost:3000/pets/:id`
   - Substituir `:id` pelo ID do animal que deseja atualizar.
   - Corpo da requisição (JSON) com os campos a serem atualizados:
     ```json
     {
       "animal": "Novo Tipo do Animal",
       "raca": "Nova Raça do Animal",
       "idade": Nova_Idade_do_Animal,
       "sexo": "Novo Sexo do Animal",
       "descricao": "Nova Descrição do Animal"
     }
     ```
   - Enviar a requisição para atualizar os dados do animal.

 **Deletar um animal**:
    - Método: DELETE
    - URL: `http://localhost:3000/pets/:id`
    - Substituir `:id` pelo ID do animal que deseja deletar.
    - Enviar a requisição para deletar o animal.

