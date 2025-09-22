import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import waitPort from "wait-port";

import { env } from "./config/env.js";
import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();
app.use(express.json());

(async () => {
    try {
        console.log("Esperando a que MySQL esté listo...");

        const open = await waitPort({
            host: env.db.host,
            port: env.db.port,
            timeout: 30000,
            output: "silent"
        });

        if (!open) {
            console.error("MySQL no respondió a tiempo");
            process.exit(1);
        }

        console.log("MySQL listo, conectando...");

        await db.getConnection();
        console.log("Conexión a MySQL establecida");

        app.use("/auth", authRoutes);
        app.use("/usuarios", usuarioRoutes);
        app.use("/productos", productoRoutes);
        app.use("/pedidos", pedidoRoutes);

        app.listen(env.port, () => {
            console.log(`Servidor corriendo en http://localhost:${env.port}`);
        });

    } catch (err) {
        console.error("Error conectando a MySQL:", err);
        process.exit(1);
    }
})();