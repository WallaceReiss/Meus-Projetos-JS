const HomeModel = require('../models/HomeModel');


HomeModel.create({
    titulo: 'Título de Teste',
    descricao: 'Descrição de teste'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('index');
    return;
};
/////////////////////////////////////////////////////////////////
// HomeModel.find({  // usado para listar os dados no BD
//     titulo: 'Título de Teste',
//     descricao: 'Descrição de teste'
// })
//     .then(dados => console.log(dados))
//     .catch(e => console.log(e));

// exports.paginaInicial = (req, res) => {
//     res.render('index');
//     return;
// };

exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
};