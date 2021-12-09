# Desafio-CI-T-Todo-List

## Tecnologias utilizadas
* Laravel
* Vue.js
* Vue Router 
* Vuex
* Jest
* PHPUnit

## Princípios
* SOLID
* KISS
* DRY
* Clean Code
* Test Driven Development

## Grupo 2 - Integrantes
* Taynara Talia Marques Alves
* Felipe Batista de Almeida dos Santos
* Paulo Henrique Caminha

## Como rodar o projeto ?

### Primeiro precisamos de ter algumas ferramentas instaladas!

* PHP 7.4
* Node 16.0(LTS)
* NPM
* Composer
* sqlite3 - (Extensão php)

### No diretório da api precisamos rodar os seguintes comandos:
```
  composer install 
  php artisan key:generate
  php artisan migrate
  php artisan serve
```

### No diretório do website precisamos rodar os seguintes comandos:
```
  npm install
  npm run serve
```

### Acessando os recursos
* A interface poderá ser acessada em http://localhost:3000/
* As rotas da api são acessadas em http://localhost:8000/api/

### Para rodar os testes, como faz?
* Utilizamos o jest nos testes de frontend então:
```
npm run test
```
