-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-06-2022 a las 03:32:13
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turismo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `idEmpresa` int(10) NOT NULL AUTO_INCREMENT,
  `razonSocial` text,
  `rfc` text,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`idEmpresa`, `razonSocial`, `rfc`) VALUES
(1, 'MEX-1', 'MEDE125423'),
(2, 'fghjbknml', 'MEDE125423'),
(3, 'MEXICANA', 'MEDE125423'),
(12, 'MEXICANA', 'sdfsddjhjkhg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `idProducto` int(10) NOT NULL AUTO_INCREMENT,
  `idServicio` int(10) DEFAULT NULL,
  `nombre` text,
  `descripcion` text,
  `costo` double DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `idServicio`, `nombre`, `descripcion`, `costo`, `precio`, `stock`) VALUES
(2, 2, 'monarca', 'Monarca', 235, 123, 12),
(3, 2, 'Monarca', 'Mariposa', 234, 123545, 12),
(23, 12, 'prodcut', 'productoassdas', 34, 45, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

DROP TABLE IF EXISTS `reservaciones`;
CREATE TABLE IF NOT EXISTS `reservaciones` (
  `idReservacion` int(20) NOT NULL AUTO_INCREMENT,
  `idServicio` int(20) NOT NULL,
  `nombreCompleto` text NOT NULL,
  `correoCliente` text NOT NULL,
  `telefono` text NOT NULL,
  `numeroReservaciones` int(11) NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`idReservacion`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`idReservacion`, `idServicio`, `nombreCompleto`, `correoCliente`, `telefono`, `numeroReservaciones`, `total`) VALUES
(6, 1, 'Jocabed Ríos', 'jocabed@gmail.com', '4443130412', 1, 150),
(8, 1, 'fgdgdg', '646', '65656464', 3, 450),
(9, 1, 'gfdgg', 'gdfgdgfdfg', '5464454165', 2, 300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `idServicio` int(11) NOT NULL AUTO_INCREMENT,
  `idEmpresa` int(11) DEFAULT NULL,
  `estado` text,
  `nombre` text,
  `descripcion` text,
  `costoPersona` double DEFAULT NULL,
  `precioPersona` double DEFAULT NULL,
  `fechaInicio` text,
  `fechaFinal` text,
  `disponibilidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicio`, `idEmpresa`, `estado`, `nombre`, `descripcion`, `costoPersona`, `precioPersona`, `fechaInicio`, `fechaFinal`, `disponibilidad`) VALUES
(1, 12, 'Activo', 'Tour Centro', 'Tour Centro', 150, 300, '02-06-2022', '02-06-2022', 13),
(2, 12, 'Activo', 'Tour Centro 2', 'Tour Centro', 150, 300, '02-06-2022', '02-06-2022', 4),
(12, 3, 'dispo', 'cactus', 'originario de mas', 23, 34, '02-11-2022', '03-11-2022', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesreservacion`
--

DROP TABLE IF EXISTS `solicitudesreservacion`;
CREATE TABLE IF NOT EXISTS `solicitudesreservacion` (
  `idSolicitud` int(10) NOT NULL AUTO_INCREMENT,
  `idServicio` int(10) DEFAULT NULL,
  `correoCliente` int(10) DEFAULT NULL,
  PRIMARY KEY (`idSolicitud`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `solicitudesreservacion`
--

INSERT INTO `solicitudesreservacion` (`idSolicitud`, `idServicio`, `correoCliente`) VALUES
(1, 12, 32),
(2, 12, 32),
(3, 12, 32),
(4, 12, 32);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sqlite_sequence`
--

DROP TABLE IF EXISTS `sqlite_sequence`;
CREATE TABLE IF NOT EXISTS `sqlite_sequence` (
  `name` text,
  `seq` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sqlite_sequence`
--

INSERT INTO `sqlite_sequence` (`name`, `seq`) VALUES
('servicios', 0),
('solicitudesReservacion', 0),
('reservaciones', 0),
('productos', 0),
('usuarios', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` text,
  `primerApellido` text,
  `segundoApellido` text,
  `correo` varchar(50) DEFAULT NULL,
  `tipo` text,
  `contrasena` varchar(50) DEFAULT NULL,
  `idEmpresa` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `primerApellido`, `segundoApellido`, `correo`, `tipo`, `contrasena`, `idEmpresa`) VALUES
(1, 'Usuario1', 'Usuario1', 'Usuario1', 'usuario1@gmail.com', 'Administrador', 'usuario1', 1),
(9, 'erewrwr', 'rewrwer', 'ewrwer', 'rewrwer', 'Empresa', 'rewrewr', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosempresa`
--

DROP TABLE IF EXISTS `usuariosempresa`;
CREATE TABLE IF NOT EXISTS `usuariosempresa` (
  `idUsuario` text,
  `idEmpresa` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariosempresa`
--

INSERT INTO `usuariosempresa` (`idUsuario`, `idEmpresa`) VALUES
('idUsuario', 'idEmpresa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
