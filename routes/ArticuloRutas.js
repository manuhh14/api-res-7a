const express = require('express');
const router = express.Router();

const AritculoControlador= require('../controllers/ArticuloControlador')

//Rutas para articulos
router.get('/ruta-de-prueba', AritculoControlador.prueba);
router.post('/crear', AritculoControlador.crear);
router.get('/listar-todos', AritculoControlador.listar);
router.get('/mostrar/:id', AritculoControlador.mostratUno);

module.exports = router;

///http://localhost:3900/api/listar-todos
//http://localhost:3900/api/crear
//http://localhost:3900/api/mostrar/6708aba2b4494b377184048d