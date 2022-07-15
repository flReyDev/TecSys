const { Router } = require('express');
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controllers/usuarios.controller');


const routerUsers = Router();

// router.use(function auditar(req, res, next) {
//     console.log(`El usuarios Pepito visito: ${ req.originalUrl }  `, (new Date()).toISOString());
//     next();
// });


routerUsers.get('/all', getUsers);
routerUsers.get('/:id', getUser);
routerUsers.post('/create', postUser);
routerUsers.put('/update/:id', putUser);
routerUsers.delete('/del/:id', deleteUser);

module.exports = {
    routerUsers
};