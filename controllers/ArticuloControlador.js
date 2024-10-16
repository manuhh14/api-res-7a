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


/* Metodo para conseguir articulos */
const listar = async (req, res) => {
    // Simular una espera de 5 segundos
    setTimeout(async () => {
        try {
            // Realizar la consulta de los artículos y limitar el número de resultados
            const articulos = await Articulo.find({}).sort({ fecha: -1 }).exec();
            
            // Verificar si no se encontraron artículos
            if (!articulos || articulos.length === 0) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se encontraron artículos"
                });
            }

            // Devolver los artículos encontrados
            return res.status(200).json({
                status: "OK",
                parametro: req.params.ultimos, 
                contador: articulos.length,
                articulos: articulos
            });
        } catch (error) {
            // Manejar cualquier error que ocurra
            console.error("Error al obtener los artículos:", error);
            return res.status(500).json({
                status: "Error",
                mensaje: "Hubo un problema al obtener los artículos"
            });
        }
    }, 1000);
};

const mostratUno = async (req, res)=>{

    try {
        //Recoger el Id por url 
        let id = req.params.id;

        //Buscar el articulo por id
        const articulo = await Articulo.findById(id);

        //si es que no se encuentra el  articulo 
        if (!articulo){
            return res.status(404).json({
                status: 'error',
                mensaje: 'El articulo no existe'
            })
        };

        /// si es que si encuetra el articulo 
        return res.status(200).json({
            status:'OK',
            mensaje: 'Articulo encontrado',
            articulo: articulo
        });


    } catch (error) {
        console.log("Error al buscar el articulo")
        return res.status(500).json({
            status: 'error',
            mensaje: 'Hubo un error al buscar el articulo'
        });
    }
};


module.exports = {
    prueba,
    crear,
    listar,
    mostratUno
};