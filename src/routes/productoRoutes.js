const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const { autenticarToken, autorizarRol } = require("../middlewares/auth");

router.get("/", autenticarToken, autorizarRol(["superAdmin", "admin"]), productoController.obtenerTodosProductos);
router.post("/", autenticarToken, autorizarRol(["superAdmin", "admin"]), productoController.crearProducto);
router.put("/:id", autenticarToken, autorizarRol(["superAdmin", "admin"]), productoController.actualizarProducto);
router.delete("/:id", autenticarToken, autorizarRol(["superAdmin", "admin"]), productoController.eliminarProducto);

module.exports = router;