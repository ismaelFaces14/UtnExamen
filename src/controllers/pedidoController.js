const db = require("../config/db");
const pedidoQueries = require("../queries/pedidoQueries");
const detalleQueries = require("../queries/detalleQueries");

const pedidoController = {
    async crearPedido(req, res) {
        try {
            const { productos } = req.body;
            if (!productos || productos.length === 0) {
                return res.status(400).json({ error: "Debe enviar productos" });
            }

            const [result] = await db.query(pedidoQueries.create, [new Date(), req.user.id]);
            const pedidoId = result.insertId;

            for (const item of productos) {
                await db.query(detalleQueries.create, [pedidoId, item.id_producto, item.cantidad]);
            }

            res.status(201).json({ message: "Pedido creado", pedidoId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async obtenerPedidos(req, res) {
        try {
            const [rows] = await db.query(pedidoQueries.getAll);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async obtenerPedidoPorId(req, res) {
        try {
            const { id } = req.params;
            const [rows] = await db.query(pedidoQueries.getById, [id]);
            if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async detallePedido(req, res) {
        try {
            const { id } = req.params;
            const [rows] = await db.query(detalleQueries.detalleDePedido, [id]);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async totalProductos(req, res) {
        try {
            const { id } = req.params;
            const [rows] = await db.query(detalleQueries.totalProductosEnPedido, [id]);
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = pedidoController;