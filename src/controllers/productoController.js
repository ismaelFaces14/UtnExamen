import db from '../config/db.js';
import { productoQueries } from '../queries/productoQueries.js';

export async function obtenerTodosProductos(req, res) {
    try {
        const [rows] = await db.query(productoQueries.getAll);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function crearProducto(req, res) {
    try {
        const { nombre, precio, stock } = req.body;
        if (!nombre || !precio || !stock) {
            return res.status(400).json({ error: "Datos incompletos" });
        }
        const [result] = await db.query(productoQueries.create, [nombre, precio, stock]);
        res.status(201).json({ message: "Producto creado", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function actualizarProducto(req, res) {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;
        const [result] = await db.query(productoQueries.update, [nombre, precio, stock, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query(productoQueries.delete, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


