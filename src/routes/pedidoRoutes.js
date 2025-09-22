import express from "express";
import * as pedidoController from "../controllers/pedidoController.js";
import { autenticarToken, autorizarRol } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    autenticarToken,
    autorizarRol(["user", "admin", "superAdmin"]),
    pedidoController.detallePedido
);

router.post(
    "/",
    autenticarToken,
    autorizarRol(["user"]),
    pedidoController.crearPedido
);

router.get(
    "/reporte/detalle",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    pedidoController.totalProductos
);

export default router;