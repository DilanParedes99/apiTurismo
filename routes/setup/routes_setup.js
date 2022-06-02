const controlerGet = require('./servicios/getcliente')
const controlerPost = require('./servicios/postcliente')

const jwt = require('jsonwebtoken')


module.exports.setup = (app,express) =>{
    
    var secureapp = express.Router()
    app.use('/secured', secureapp)
    secureapp.use((req,res,next) => {
        
        const bearer = req.headers['authorization']
        if(bearer){
            jwt.verify(bearer,process.env.JWT_SECRET, function(err,decode){
                if(err){
                    res.status(401).json({
                        msg:'Token_invalido'
                    })
                }else{
                    next()
                }
            })
        }else{
            res.status(401).json({
                msg:'Sin autorización'
            })
        }
    })
                                //RUTAS


    //home prueba de servidor
    app.get('/', (req,res) => res.status(200).json({msg:'BACKEND'}))

    //post 
    app.post('/login', controlerPost.login)

    //Producto
    app.post('/newProducto',controlerPost.newProducto)
    app.post('/editProducto',controlerPost.editProducto)
    app.post('/deleteProducto',controlerPost.deleteProducto)

    //Servicio
    app.post('/newServicio',controlerPost.newServicio)
    app.post('/editServicio',controlerPost.editServicio)
    app.post('/deleteServicio',controlerPost.deleteServicio)

    //Reservacion
    app.post('/newReservacion',controlerPost.newReservacion)
    app.post('/editReservacion',controlerPost.editReservacion)
    app.post('/deleteReservacion',controlerPost.deleteReservacion)

    //Solicitud
    app.post('/deleteSolicitud',controlerPost.deleteSolicitud)

    //Empresa
    app.post('/newEmpresa',controlerPost.newEmpresa)
    app.post('/editEmpresa',controlerPost.editEmpresa)
    app.post('/deleteEmpresa',controlerPost.deleteEmpresa)

    //get
    app.get('/getProductos', controlerGet.getProductos)
    app.get('/getEmpresas', controlerGet.getEmpresas)
    app.get('/getServicios', controlerGet.getServicios)
    app.get('/getReservaciones', controlerGet.getReservaciones)
    app.get('/getSolicitudesReservacion', controlerGet.getSolicitudesReservacion)
    app.get('/getNameEmpresas', controlerGet.getNameEmpresas)

    

    return app
}