import express from "express";
import * as productoController from "../controllers/productoController.js";
import { autenticarToken, autorizarRol } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    productoController.obtenerTodosProductos
);

router.post(
    "/",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    productoController.crearProducto
);

router.put(
    "/:id",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    productoController.actualizarProducto
);

router.delete(
    "/:id",
    autenticarToken,
    autorizarRol(["superAdmin", "admin"]),
    productoController.eliminarProducto
);

export default router;