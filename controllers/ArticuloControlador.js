const validator = require('validator');
const Articulo = require('../models/Articulo')

const prueba = (req, res)=>{

    return res.status(200).json({
        mensaje: "Hola desde la ruta de prueba"
    });
};

/**Funcion para crear un articulo en la base de datos */
const crear = async (req, res)=>{
    ///Recoger los parametros por POST
    let parametros = req.body;
    
    ///validaciones
    if(!parametros || !parametros.titulo || !parametros.contenido){
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos obligatorios'
        });
    }

    try{
        let validar_titulo = !validator.isEmpty(parametros.titulo);
        let validar_contenido =!validator.isEmpty(parametros.contenido);

        if(!validar_titulo ||!validar_contenido){
            throw new Error("La validacion de los datos ha fallado");
        }

    }catch(error){
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error al crear el articulo'
        });
    }

    try{
        //Creacion de datos a guardar
        const aritculo= new Articulo(parametros);

        //Guardar los registros en la base de datos
        const articuloGuardado = await aritculo.save();

        //Devolver el articulo creado
        return res.status(200).json({
            status:'success',
            mensaje: 'Articulo creado correctamente',
            articulo: articuloGuardado
        });

    }catch(error){
        return res.status(500).json({
            status: 'error',
            mensaje: 'No se a podido guardar el articulo',
            error: error.message
        });
    }
};

module.exports = {
    prueba,
    crear
};