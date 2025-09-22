import express from "express";
import * as usuarioController from '../controllers/usuarioController.js';
import { autenticarToken, autorizarRol } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.obtenerTodosUsuarios
);

router.get(
    "/:id",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.obtenerUsuarioPorId
);

router.post(
    "/",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.crearUsuario
);

router.put(
    "/:id",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.actualizarUsuario
);

router.delete(
    "/:id",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.eliminarUsuario
);

router.get(
    "/reporte/mas-pedidos",
    autenticarToken,
    autorizarRol(["superAdmin"]),
    usuarioController.usuarioConPedidos
);

export default router;