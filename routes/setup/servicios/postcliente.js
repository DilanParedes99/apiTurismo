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

//EDITAR UN PRODUCTO POR MEDIO DE SU ID
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

//>ELIMINA UN PRODUCTO POR MEDIO DE SU ID
function deleteProducto(req,res){
    const data = req.query

    dbconn.query('DELETE FROM `productos` WHERE idProducto=?',[parseInt(data.idProducto)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos o el producto no existe'})
    })
}

//AGREGA NUEVO SERVICIO
function newServicio(req,res){
    const data = req.query
    //console.log(data)

    dbconn.query('INSERT INTO `servicios`( `idEmpresa`, `estado`, `nombre`, `descripcion`, `costoPersona`, `precioPersona`, `fechaInicio`, `fechaFinal`, `disponibilidad`) VALUES (?,?,?,?,?,?,?,?,?)',[parseInt(data.idEmpresa),data.estado,data.nombre,data.descripcion,parseInt(data.costoPersona),parseInt(data.precioPersona),data.fechaInicio,data.fechaFinal,data.disponibilidad])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exitoso'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos'})
    })
}

//EDITA UN SERVICIO POR MEDIO DEL ID
function editServicio(req,res){
    const data = req.query
    //console.log(data)

    dbconn.query('UPDATE `servicios` SET `idEmpresa`=?,`estado`=?,`nombre`=?,`descripcion`=?,`costoPersona`=?,`precioPersona`=?,`fechaInicio`=?,`fechaFinal`=?,`disponibilidad`=? WHERE idServicio=?',[parseInt(data.idEmpresa),data.estado,data.nombre,data.descripcion,parseInt(data.costoPersona),parseInt(data.precioPersona),data.fechaInicio,data.fechaFinal,data.disponibilidad, parseInt(data.idServicio)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exitoso'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos'})
    })
}

//ELIMINAR SERVICIO POR MEDIO DEL ID
function deleteServicio(req,res){
    const data = req.query

    dbconn.query('DELETE FROM `servicios` WHERE idServicio=?',[parseInt(data.idServicio)])
    .then(rows=>{
        console.log(rows)

        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(500).json({'msg':'algo salio mal'})
    })
}

//ELIMINAR SOLICITUD POR MEDIO DEL ID
function deleteSolicitud(req,res){
    const data = req.query

    dbconn.query('DELETE FROM `solicitudesreservacion` WHERE idSolicitud=?',[parseInt(data.idSolicitud)])
    .then(rows=>{
        console.log(rows)

        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(500).json({'msg':'algo salio mal'})
    })
}


module.exports ={
    login,
    newProducto,
    editProducto,
    deleteProducto,
    newServicio,
    editServicio,
    deleteServicio,
    deleteSolicitud
}