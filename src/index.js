// index.js
require("dotenv").config();
const express = require("express");
const waitPort = require("wait-port");

const { env } = require("./config/env");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const productoRoutes = require("./routes/productoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

const app = express();
app.use(express.json());

(async () => {
    try {
        console.log("⏳ Esperando a que MySQL esté listo...");

        const open = await waitPort({
            host: env.db.host,
            port: env.db.port,
            timeout: 30000, // 30 segundos
            output: "silent"
        });

        if (!open) {
            console.error("❌ MySQL no respondió a tiempo");
            process.exit(1);
        }

        console.log("✅ MySQL listo, conectando...");

        // Intentar conectar a la DB
        await db.getConnection();
        console.log("✅ Conexión a MySQL establecida");

        // Rutas
        app.use("/auth", authRoutes);
        app.use("/usuarios", usuarioRoutes);
        app.use("/productos", productoRoutes);
        app.use("/pedidos", pedidoRoutes);

        // Levantar servidor
        app.listen(env.port, () => {
            console.log(`Servidor corriendo en http://localhost:${env.port}`);
        });

    } catch (err) {
        console.error("❌ Error conectando a MySQL:", err);
        process.exit(1);
    }
})();