exports.middlewareGlobal = (req, res, next) => {

    if(req.body.cliente) {
        console.log();
        console.log('Passei no middleware global');
        console.log(`Vi que postou ${req.body.cliente}`)
    }

    next();
};