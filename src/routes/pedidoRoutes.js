const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const { autenticarToken, autorizarRol } = require("../middlewares/auth");

router.get("/", autenticarToken, autorizarRol(["user", "admin", "superAdmin"]), pedidoController.detallePedido);
router.post("/", autenticarToken, autorizarRol(["user"]), pedidoController.crearPedido);
router.get("/reporte/detalle", autenticarToken, autorizarRol(["superAdmin", "admin"]), pedidoController.totalProductos);

module.exports = router;