const conexion = require('./database/conexion');
const express = require('express');
const cors= require('cors');

///Inicializar App
console.log("aplicacion arrancada.....!!");

//conectar a la base de datos
conexion.conexion()

//crear servidor de express
const app= express();
const puerto= 3900;

//configurar cors
app.use(cors());
app.use(express.json());

// Crear Rutas
app.get('/prueba', (req, res)=>{

    return res.status(200).send(`
        <div>
            <h1>Hola desde la API</h1>
            <p>Esta es una prueba de la API</p>
        </div>
        `)
});

app.get('/', (req, res)=>{
    return res.status(200).json([{
        id: 1,
        nombre: "Manuel",
        apellido: "Hernandez Herrera",
        edad: 31
    },
    {
        id: 2,
        nombre: "Juan",
        apellido: "Perez Martinez",
        edad: 28
    }]);
});

//Arrancar el servidor y ecuchar las peticiones
app.listen(puerto, ()=>{
    console.log("Servidor corriendo en el puerto: " + puerto);
});