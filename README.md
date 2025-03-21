# reservas

Descrição

Este projeto é uma API REST desenvolvida para gerenciar a reserva de salas acadêmicas na UniEVANGÉLICA. A API permite o cadastro de blocos e salas, gerenciamento de reservas, verificação de disponibilidade, cancelamento de reservas e geração de relatórios.

Tecnologias Utilizadas

Node.js com Express.js

MongoDB com Mongoose

Autenticação JWT 

Postman para testes

Instalação e Configuração

1. Clone o repositório

git clone https://github.com/Gustavo2Toledo/reservas.git
cd reservas

2. Instalar as dependências

npm install

3. Configurar o ambiente

Crie um arquivo .env na raiz do projeto e adicione:

PORT=3000
MONGO_URI=mongodb://localhost:27017/reservas
JWT_SECRET=sua_chave_secreta

4. Iniciar a API

npm start

A API vai rodar em http://localhost:3000

Endpoints

1. Cadastro de Blocos

POST /blocos

Body:

{
  "nome": "Bloco A"
}

2. Cadastro de Salas

POST /salas

Body:

{
  "bloco": "Bloco A",
  "nome": "Sala 101",
  "capacidade": 30
}

3. Reservar uma Sala

POST /reservas

Body:

{
  "sala": "Sala 101",
  "data": "2025-04-01T14:00:00.000Z",
  "coordenador": "Professor João",
  "motivo": "Reunião"
}

4. Cancelar uma Reserva

DELETE /reservas/:id

5. Listar Reservas

GET /reservas

Testes

Recomenda-se testar a API com o Postman ou Insomnia.

Autenticação (Opcional)

Para acessar alguns endpoints, é necessário autenticação via JWT.

Login:

POST /auth/login

Body:

{
  "email": "admin@example.com",
  "senha": "123456"
}

Resposta:

{
  "token": "seu_token_aqui"
}

Inclua esse token no cabeçalho das requisições:

Authorization: Bearer seu_token_aqui

Relatórios

GET /relatorios
Gera estatísticas de uso das salas.
