# apiTurismo
Api dedicada al proyecto academico de la materia de Programación Móvil

                                            INICIO RÁPIDO

1.- clonar el repositorio

2.- abrir terminal en la carpeta raíz del proyecto y ejecutar el comando "git install"

                                            CORRER LA API

1.- en la terminal ejecutar el comando "npm run dev"

2.- e la temrinal se mostraran los procesos que se estan ejecutando

                                            IMPORTAR LA BASE DE DATOS EN WORKBENCH

1.- Crear un nuevo host en donde dice "MYSQL connections" 

2.- dejar los valores por default

3.- Crear un nuevo schema (en el cuarto icono que esta en la barra de tareas de workbench)

4.- crearlo con el nombre de la base de datos "turismo" y dar click en "Apply"

5.- En seguida  dar click en la pestaña "Server" en la barra de tareas de workbench y dar click en "Data Import"

6.- Se abrira una ventana y se seleccionara la parte que dice "Import from self-Contained File"

7.- En la parte de abajo dice "Default Schema to be imported to", ahi seleccionar el esquema que acabamos de crear con el el nombre de Turismo

8.-Click en "Start import"

                                            LISTO
                                            
                                            
                                            RUTAS PARA UTILIZAR 
                                            
    NOTA: el puerto depende de donde estes corriendo tu localhost del backend
    NOTA 2: todas las rutas decuelven todos los datos de la tabla
                                            
1.- Ruta para LOGIN : http://localhost:8080/login

2.-Ruta para mostrar datos de productos: http://localhost:8080/getProductos

3.- Ruta para mostrar datos de empresas: http://localhost:8080/getEmpresas

4.-Ruta para mostrar datos de reservaciones : http://localhost:8080/getReservaciones

5.- Ruta para mostrar datos de solicitudes de reservacione : http://localhost:8080/getSolicitudesReservacion

