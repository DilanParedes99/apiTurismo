BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "usuarios" (
	"idUsuario"	INTEGER UNIQUE,
	"nombreUsuario"	TEXT,
	"primerApellido"	TEXT,
	"segundoApellido"	TEXT,
	"correo"	TEXT UNIQUE,
	"tipo"	TEXT,
	PRIMARY KEY("idUsuario" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "empresas" (
	"idEmpresa"	INTEGER UNIQUE,
	"razonSocial"	TEXT,
	"rfc"	TEXT UNIQUE,
	PRIMARY KEY("idEmpresa" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "usuariosEmpresa" (
	"idUsuario"	INTEGER,
	"idEmpresa"	INTEGER,
	PRIMARY KEY("idEmpresa","idUsuario")
);
CREATE TABLE IF NOT EXISTS "servicios" (
	"idServicio"	INTEGER,
	"idEmpresa"	INTEGER,
	"estado"	INTEGER,
	"nombre"	TEXT,
	"descripcion"	TEXT,
	"costoPersona"	REAL,
	"precioPersona"	REAL,
	"fechaInicio"	INTEGER,
	"fechaFinal"	TEXT,
	"disponibilidad"	INTEGER,
	PRIMARY KEY("idServicio" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "solicitudesReservacion" (
	"idSolicitud"	INTEGER,
	"idServicio"	INTEGER,
	"correoCliente"	INTEGER,
	PRIMARY KEY("idSolicitud" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "reservaciones" (
	"idReservacion"	INTEGER,
	"idSolicitd"	INTEGER UNIQUE,
	"ticket"	TEXT UNIQUE,
	PRIMARY KEY("idReservacion" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "productos" (
	"idProducto"	INTEGER,
	"idEmpresa"	INTEGER,
	"nombre"	TEXT,
	"descripcion"	TEXT,
	"costo"	REAL,
	"precio"	REAL,
	"stock"	INTEGER,
	PRIMARY KEY("idProducto" AUTOINCREMENT)
);
COMMIT;
