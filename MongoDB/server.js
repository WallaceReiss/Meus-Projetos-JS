require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const connectionString = '' // AQUI VIRIA O LINK DE ACESSO AO BANCO MAS FOI CRIADO UM ARQUIVO .ENV PARA ESCONDER OS DADOS

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true ,  useUnifiedTopology: true }) // parametros para retirar os avisos de alerta
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));    // necessário o then, pois mongoose retorna uma promise

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middleware');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// middlewares criados 
app.use(middlewareGlobal);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000')
    });
    
});
