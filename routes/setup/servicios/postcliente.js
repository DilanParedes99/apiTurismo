const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');

//login 
function login (req, res) {
    const password = req.body['contrasena'];
    const email = req.body['correo'];
    /* console.log("entra",password,email) */

    dbconn.query('select tipo, idEmpresa from usuarios where correo=? and contrasena=?',[email,password])
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
    const data = req.body
    console.log(data,req)

    dbconn.query('INSERT INTO `productos`(`idServicio`, `nombre`, `descripcion`, `costo`, `precio`, `stock`) VALUES (?,?,?,?,?,?)',[parseInt(data.idServicio),data.nombre,data.descripcion,data.costo,data.precio,data.stock])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'mensaje':'error en los datos'})
    })

    
}

//EDITAR UN PRODUCTO POR MEDIO DE SU ID
function editProducto(req,res){
    const data = req.body
    //console.log(data)
    dbconn.query('UPDATE `productos` SET `idServicio`=?,`nombre`=?,`descripcion`=?,`costo`=?,`precio`=?,`stock`=? WHERE idProducto=?',[parseInt(data.idServicio),data.nombre,data.descripcion,data.costo,data.precio,data.stock,parseInt(data.idProducto)])
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
    const data = req.body

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
    const data = req.body
    console.log(data, req)
    dbconn
    .query('INSERT INTO `servicios`( `idEmpresa`, `estado`, `nombre`, `descripcion`, `costoPersona`, `precioPersona`, `fechaInicio`, `fechaFinal`, `disponibilidad`) VALUES (?,?,?,?,?,?,?,?,?)',[parseInt(data.idEmpresa),data.estado,data.nombre,data.descripcion,parseFloat(data.costoPersona),parseFloat(data.precioPersona),data.fechaInicio,data.fechaFinal,parseInt(data.disponibilidad)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exitoso'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos'})
    })
}

//EDITA UN SERVICIO POR MEDIO DEL ID
function editServicio(req,res){
    const data = req.body
    //console.log(data)

    dbconn.query('UPDATE `servicios` SET `idEmpresa`=?,`estado`=?,`nombre`=?,`descripcion`=?,`costoPersona`=?,`precioPersona`=?,`fechaInicio`=?,`fechaFinal`=?,`disponibilidad`=? WHERE idServicio=?',[parseInt(data.idEmpresa),data.estado,data.nombre,data.descripcion,parseFloat(data.costoPersona),parseFloat(data.precioPersona),data.fechaInicio,data.fechaFinal,parseInt(data.disponibilidad), parseInt(data.idServicio)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exitoso'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos'})
    })
}

// ACTUALIZAR UN SERVICIO DESPUÉS DE UNA RESERVACIÓN POR MEDIO DEL ID
function actualizarServicio(req,res){
    const data = req.body
    //console.log(data)

    if(parseInt(data.disponibilidad)==0){
        dbconn.query('UPDATE `servicios` SET `disponibilidad`=?, `estado`="No Disponible" WHERE idServicio=?',[parseInt(data.disponibilidad),parseInt(data.idServicio)])        .then(rows=>{
            console.log(rows)
            res.status(200).json({'msg':'exitoso'})
        }).catch(err=>{
            res.status(400).json({'msg':'error en los datos'})
        })
    }
    else{
        dbconn.query('UPDATE `servicios` SET `disponibilidad`=? WHERE idServicio=?',[parseInt(data.disponibilidad),parseInt(data.idServicio)])
        .then(rows=>{
            console.log(rows)
            res.status(200).json({'msg':'exitoso'})
        }).catch(err=>{
            res.status(400).json({'msg':'error en los datos'})
        })
    }
}

//ELIMINAR SERVICIO POR MEDIO DEL ID
function deleteServicio(req,res){
    const data = req.body

    dbconn.query('DELETE FROM `servicios` WHERE idServicio=? AND idServicio NOT IN (SELECT idServicio FROM productos)',[parseInt(data.idServicio)])
    .then(rows=>{
        console.log(rows)

        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(500).json({'msg':'algo salio mal'})
    })
}

//ELIMINAR SOLICITUD POR MEDIO DEL ID
function deleteSolicitud(req,res){
    const data = req.body

    dbconn.query('DELETE FROM `solicitudesreservacion` WHERE idSolicitud=?',[parseInt(data.idSolicitud)])
    .then(rows=>{
        console.log(rows)

        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(500).json({'msg':'algo salio mal'})
    })
}

//AGREGA UNA NUEVA EMPRESA
function newEmpresa(req,res){
    const data = req.body
    //console.log(data,parseInt(data.razonSocial))

    dbconn.query('INSERT INTO `empresas`(`razonSocial`, `rfc`) VALUES (?,?)',[data.razonSocial,data.rfc])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'mensaje':'error en los datos'})
    })

    
}

//EDITAR UNA EMPRESA POR MEDIO DE SU ID
function editEmpresa(req,res){
    const data = req.body
    //console.log(data)
    dbconn.query('UPDATE `empresas` SET `razonSocial`=?,`rfc`=? WHERE idEmpresa=?',[data.razonSocial,data.rfc,parseInt(data.idEmpresa)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'Exito'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({'msg':'error en los datos'})
    })
}

//ELIMINA UNA EMPRESA POR MEDIO DE SU ID
function deleteEmpresa(req,res){

    const data = req.body

    dbconn.query('DELETE FROM `empresas` WHERE idEmpresa=? AND idEmpresa NOT IN (SELECT idEmpresa FROM servicios)',[parseInt(data.idEmpresa)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos o el producto no existe'})
    })
}

//AGREGA UNA NUEVA RESERVACION
function newReservacion(req,res){
    const data = req.body
    console.log(data)

    dbconn.query('INSERT INTO `reservaciones`(`idServicio`,`nombreCompleto`,`correoCliente`,`telefono`,`numeroReservaciones`,`total`) VALUES (?,?,?,?,?,?)',[parseInt(data.idServicio),data.nombreCompleto,data.correoCliente,data.telefono,parseInt(data.numeroReservaciones),parseFloat(data.total)])
    .then(rows=>{
        //console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'mensaje':'error en los datos',error:err})
    })

    
}

//EDITAR UNA RESERVACION POR MEDIO DE SU ID
function editReservacion(req,res){
    const data = req.body
    console.log(data)

    dbconn.query('UPDATE `reservaciones` SET `idServicio`=?,`nombreCompleto`=?,`correoCliente`=?,`telefono`=?,`numeroReservaciones`=?,`total`=? WHERE idReservacion=?',[parseInt(data.idServicio),data.nombreCompleto,data.correoCliente,data.telefono,parseInt(data.numeroReservaciones),parseFloat(data.total),parseInt(data.idReservacion)])
    .then(rows=>{
        //console.log(rows)
        res.status(200).json({'msg':'Exito'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({'msg':'error en los datos'})
    })
}

//ELIMINA UNA RESERVACION POR MEDIO DE SU ID
function deleteReservacion(req,res){

    const data = req.body

    dbconn.query('DELETE FROM `reservaciones` WHERE idReservacion=?',[parseInt(data.idReservacion)])
    .then(rows=>{
        console.log(rows)
        res.status(200).json({'msg':'exito'})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos o el producto no existe'})
    })
}

//NUEVO USUARIO
function newUsuario(req,res){
    const data = req.body
    console.log(data)
    dbconn.query('INSERT INTO `usuarios`(`nombreUsuario`, `primerApellido`, `segundoApellido`, `correo`, `contrasena`, `tipo`, `idEmpresa`) VALUES (?,?,?,?,?,?,?)',[data.nombreUsuario,data.primerApellido,data.segundoApellido,data.correo,data.contrasena,data.tipo,parseInt(data.idEmpresa)])
    .then(rows=>{
        res.status(200).json({'msg':'exito','data':rows})
    }).catch(err=>{
        res.status(400).json({'msg':'error en los datos','error':err})
    })

}

//EDITA USUARIO por ID
function editUsuario(req,res){
    const data = req.body
    console.log(data)
    dbconn.query('UPDATE `usuarios` SET `nombreUsuario`=?,`primerApellido`=?,`segundoApellido`=?,`correo`=?,`contrasena`=?,`tipo`=?, `idEmpresa`=? WHERE `idUsuario`=?',[data.nombreUsuario,data.primerApellido,data.segundoApellido,data.correo,data.contrasena,data.tipo,parseInt(data.idEmpresa),parseInt(data.idUsuario)])
    .then(rows=>{
        res.status(200).json({'msg':'exito','data':rows})
    }).catch(err=>{
        res.status(400).json({'msg':'error','error':err})
    })
}

//ELIMINAR USUARIO por ID
function deleteUsuario(req,res){
    const data = req.body
    console.log(data)
    dbconn.query('DELETE FROM `usuarios` WHERE idUsuario =?',[parseInt(data.idUsuario)])
    .then(rows=>{
        res.status(200).json({'msg':'exito','data':rows})
    }).catch(err=>{
        res.status(400).json({'msg':'error','error':err})
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
    deleteSolicitud,
    newEmpresa,
    editEmpresa,
    deleteEmpresa,
    newReservacion,
    editReservacion,
    deleteReservacion,
    newUsuario,
    editUsuario,
    deleteUsuario,
    actualizarServicio
}