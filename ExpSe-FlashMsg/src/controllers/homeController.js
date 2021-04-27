
exports.paginaInicial = (req, res) => {
    console.log(req.flash('error'), req.flash('success'), req.flash('info'));
    // req.flash('info', 'Estou aqui');
    // req.flash('error', 'Ops!!');
    // req.flash('success', 'cheguei ao fim');
    // console.log(req.session.usuario); 
    //req.session.usuario = { nome: 'Wallace', logado: true }; // aqui fica os dados salvos 
    res.render('index');
    return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
};