const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// function meuMiddleware(req, res, next) {
//     req.session = { nome: 'Wallace', sobrenome: 'Reis' };
//     console.log();
//     console.log('Passei no middleware');
//     console.log();
//     next(); // next é usado para dar seguimento à proxima função/tarefa, esquecendo dele no uso com middleware, a página não carrega

// };

// Rotas da Home//
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Rotas para contato // 
route.get('/contato', contatoController.paginaInicial);


module.exports = route;
