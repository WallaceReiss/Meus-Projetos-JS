require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true ,  useUnifiedTopology: true }) // parametros para retirar os avisos de alerta
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));    // necessário o then, pois mongoose retorna uma promise
const session = require('express-session'); // salva a session na memoria  (flash tbm)
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // msg que apos serem exibidas, elas somem
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet'); // segurança / ler documentação
const csrf = require('csurf'); // São token de segurança para que ninguém consiga postar nada em nosso site
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet()); // Usar o helmet
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'iuragj23iuwe89109uiewfWIF4W8y wR832U',//QUALQUER COISA PARA QUE NINGUEM SAIBA
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // tempo para o cookie salvar os dados = 7 dias
        httpOnly: true
    },
    
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),

});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// middlewares criados 
app.use(csrf());   // Usar o csurf
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000')
    });
    
});
