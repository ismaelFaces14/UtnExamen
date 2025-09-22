import express from "express";
import * as pedidoController from "../controllers/pedidoController.js";
import { autenticarToken, autorizarRol } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", autenticarToken, autorizarRol(["admin", "superAdmin"]), pedidoController.detallePedido);
router.get("/", autenticarToken, autorizarRol(["admin", "superAdmin"]), pedidoController.obtenerPedidos);
router.post(
    "/",
    autenticarToken,
    autorizarRol(["user"]),
    pedidoController.crearPedido
);

router.get(
    "/reporte/detalle/:id",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    pedidoController.totalProductos
);

export default router;