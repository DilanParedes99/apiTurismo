const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');


//login 

function login (req, res) {
    const password = req.query['contrasena'];
    const email = req.query['correo'];
    /* console.log("entra",password,email) */

    dbconn.query('select * from `turismo-back`.usuarios where correo=? and contrasena=?',[email,password])
    .then(rows=>{
        console.log(rows)
        if(rows.length==0){
            console.log("incorrect")
            res.status(401).json({msg:'Autenticación incorrecta'})
        }else{
            res.status(200).json({
                msg:'Autenticación correcta',
                data:rows
            }) 
        }
    }).catch(err=>{
        console.log(err)
        res.status(401).json({msg:'Autenticación incorrecta'})
    })
}


//obtiene los datos de los productos
function getProductos(req, res){
    dbconn.query('select * from `turismo-back`.`productos`')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })

}

//obtiene todos los datos de las empresas 
function getEmpresas(req, res){
    dbconn.query('SELECT * FROM `turismo-back`.empresas')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}


function getReservaciones(req, res){
    dbconn.query('SELECT * FROM `turismo-back`.reservaciones')
    .then(rows=>{
        res.status(200).json({
            status:200,
            data:rows
        })
    })
}

function getSolicitudesReservacion(req,res) {
    dbconn.query('SELECT * FROM `turismo-back`.solicitudesreservacion')
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
    login
}