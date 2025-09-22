const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { autenticarToken, autorizarRol } = require("../middlewares/auth");

router.get("/", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.obtenerTodosUsuarios);
router.get("/:id", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.obtenerUsuarioPorId);
router.post("/", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.crearUsuario);
router.put("/:id", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.actualizarUsuario);
router.delete("/:id", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.eliminarUsuario);

router.get("/reporte/mas-pedidos", autenticarToken, autorizarRol(["superAdmin"]), usuarioController.usuarioConPedidos);

module.exports = router;