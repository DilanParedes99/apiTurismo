const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');


//obtiene los datos de los productos
function getProductos(req, res){
    dbconn.query('SELECT `productos`.`idProducto`, `productos`.`nombre`, `productos`.`descripcion`, `productos`.`costo`, `productos`.`precio`, `productos`.`stock`, `productos`.`idEmpresa` FROM `productos` INNER JOIN empresas ON `productos`.`idEmpresa` = empresas.idEmpresa')
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
dbconn.query('SELECT razonSocial FROM empresas')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

//obtiene el nombre de los servicios
function getServicios(req, res){
    dbconn.query('SELECT * FROM servicios')
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
    getServicios
}