# API de Reservas de Salas

Esta API permite o gerenciamento de reservas de salas acadêmicas, possibilitando que coordenadores de curso realizem reservas e consultem a disponibilidade.

## Tecnologias Utilizadas

- Node.js com Express
- MongoDB com Mongoose
- Autenticação com JWT
- Hash de senhas com bcrypt

## Instalação e Execução

1. Clone este repositório:
   ```sh
   git clone https://github.com/seuusuario/api-reservas.git
   cd api-reservas
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto e defina:

   Lembrando que o JWT_SECRET pode ser um valor aleatório desde que ninguém mais saiba
   ```ini
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
5. Inicie o servidor:
   ```sh
   npm start
   ```

## Endpoints Principais

### Autenticação

- **Registro**: `POST /register`
  ```json
  {
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```
- **Login**: `POST /login`
  ```json
  {
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```
  **Resposta:**
  ```json
  {
    "token": "jwt_token_aqui"
  }
  ```

  Com o jwt_token 
  Acesse a aba headers e adione uma chave(key) com o nome de "Authorization"
  No valor adicione o id que jwt_token gerou
### Salas

- **Criar sala**: `POST /salas` (Requer autenticação)
  ```json
  {
    "nome": "Sala 101",
    "capacidade": 30
  }
  ```
- **Listar salas**: `GET /salas`

### Reservas

- **Criar reserva**: `POST /reservas` (Precisa de Login)
  ```json
  {
    "sala": "id_da_sala",
    "coordenador": "Professor João",
    "data": "2025-04-01T14:00:00.000Z"
  }
  ```
- **Listar reservas**: `GET /reservas` (Requer autenticação)
- **Cancelar reserva**: `DELETE /reservas/:id` (Requer autenticação)


