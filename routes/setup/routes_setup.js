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

    


    //get
    app.get('/getProductos', controlerGet.getProductos)
    app.get('/getEmpresas', controlerGet.getEmpresas)
    app.get('/getReservaciones', controlerGet.getReservaciones)
    app.get('/getSolicitudesReservacion', controlerGet.getSolicitudesReservacion)
    app.get('/getNameEmpresas', controlerGet.getNameEmpresas)
    

    return app
}