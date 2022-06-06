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

    app.post('/newProducto',controlerPost.newProducto)
    app.post('/editProducto',controlerPost.editProducto)
    app.post('/deleteProducto',controlerPost.deleteProducto)

    
    app.post('/newServicio',controlerPost.newServicio)
    app.post('/editServicio',controlerPost.editServicio)
    app.post('/deleteServicio',controlerPost.deleteServicio)

    app.post('/newReservacion',controlerPost.newReservacion)
    app.post('/editReservacion',controlerPost.editReservacion)
    app.post('/deleteReservacion',controlerPost.deleteReservacion)


    app.post('/getServiciosId', controlerGet.getServiciosId)
    

    app.post('/deleteSolicitud',controlerPost.deleteSolicitud)

    //gets
    app.get('/getProductos', controlerGet.getProductos)
    app.get('/getServicios', controlerGet.getServicios)
    app.get('/getServiciosAll', controlerGet.getServiciosAll)


    app.get('/getEmpresas', controlerGet.getEmpresas)
    app.get('/getReservaciones', controlerGet.getReservaciones)
    app.get('/getSolicitudesReservacion', controlerGet.getSolicitudesReservacion)
    app.get('/getNameEmpresas', controlerGet.getNameEmpresas)
    app.get('/getNameServicios', controlerGet.getNameServicios)
    

    return app
}