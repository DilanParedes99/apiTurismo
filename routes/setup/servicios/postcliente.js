const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');

//login 
function login (req, res) {
    const password = req.query['contrasena'];
    const email = req.query['correo'];
    /* console.log("entra",password,email) */

    dbconn.query('select * from usuarios where correo=? and contrasena=?',[email,password])
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

//AGREGA UN NUEVO PRODUCTO
function newProducto(req,res){
    const data = req.query
    //console.log(data,parseInt(data.precio))

    dbconn.query('INSERT INTO `productos`(`idEmpresa`, `nombre`, `descripcion`, `costo`, `precio`, `stock`) VALUES (?,?,?,?,?,?)',[parseInt(data.idEmpresa),data.nombre,data.descripcion,data.costo,data.precio,data.stock])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'mensaje':'error en los datos'})
    })

    
}

//EDITAR UN PRODUCTO
function editProducto(req,res){
    const data = req.query
    //console.log(data)
    dbconn.query('UPDATE `productos` SET `idEmpresa`=?,`nombre`=?,`descripcion`=?,`costo`=?,`precio`=?,`stock`=? WHERE idProducto=?',[parseInt(data.idEmpresa),data.nombre,data.descripcion,data.costo,data.precio,data.stock,parseInt(data.idProducto)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'Exito'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({'msg':'error en los datos'})
    })
}



module.exports ={
    login,
    newProducto,
    editProducto
}