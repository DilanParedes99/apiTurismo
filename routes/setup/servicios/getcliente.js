const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');


//obtiene los datos de los productos
function getProductos(req, res){
    dbconn.query('SELECT `productos`.`idProducto`, `productos`.`nombre`, `productos`.`descripcion`, `productos`.`costo`, `productos`.`precio`, `productos`.`stock`, `productos`.`idServicio` FROM `productos`')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })

}

//obtiene todos los datos de las empresas 
function getEmpresas(req, res){
    dbconn.query('SELECT * FROM empresas')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

//obtiene las reservaciones
function getReservaciones(req, res){
    dbconn.query('SELECT * FROM .reservaciones')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

//obtiene las solicitudes
function getSolicitudesReservacion(req,res) {
    dbconn.query('SELECT * FROM solicitudesreservacion')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

//obtiene el nombre de las empresas
function getNameEmpresas(req, res){
dbconn.query('SELECT idEmpresa, razonSocial FROM empresas')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

function getNameServicios(req, res){
    dbconn.query('SELECT idServicio, nombre FROM servicios')
        .then(rows=>{
            res.status(200).json({
                status:200,
                data:rows
            })
        })
    }

//obtiene el nombre de los servicios
function getServicios(req, res){
    dbconn.query('SELECT nombre,descripcion,estado,costoPersona,precioPersona,fechaInicio,fechaFinal,disponibilidad FROM servicios')
        .then(rows=>{
            res.status(200).json({
                status:200,
                data:rows
            })
        })
    }

//Obteniendo todos los productos para el admin
function getServiciosAll(req, res){
        dbconn.query('SELECT * FROM servicios')
            .then(rows=>{
                res.status(200).json({
                    status:200,
                    data:rows
                })
            })
        }

function getServiciosId(req, res){
    const id = req.body['id'];
    console.log(req.body);
    dbconn.query('SELECT nombre,descripcion,estado,costoPersona,precioPersona,fechaInicio,fechaFinal,disponibilidad FROM servicios where idServicio=?',[id])
        .then(rows=>{
            res.status(200).json({
                status:200,
                data:rows
            })
        })
    }


//Obteniendo todos los productos para el admin
function getUsuarios(req, res){
    dbconn.query('SELECT * FROM usuarios')
        .then(rows=>{
            res.status(200).json({
                status:200,
                data:rows
            })
        })
    }



module.exports={
    getProductos,
    getEmpresas,
    getReservaciones,
    getSolicitudesReservacion,
    getNameEmpresas,
    getNameServicios,
    getServicios,
    getServiciosAll,
    getServiciosId,
    getUsuarios
}