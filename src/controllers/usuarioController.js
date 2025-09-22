import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { usuarioQueries } from '../queries/usuarioQueries.js';


export async function obtenerTodosUsuarios(req, res) {
    try {
        const [rows] = await db.query(usuarioQueries.getAll);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function obtenerUsuarioPorId(req, res) {
    try {
        const { id } = req.params;
        const [rows] = await db.query(usuarioQueries.getById, [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export async function crearUsuario(req, res) {
    try {
        const { usuario, password, rol } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userRol = rol || "user";

        const [result] = await db.query(usuarioQueries.create, [usuario, hashPassword, userRol]);
        res.status(201).json({ message: "Usuario creado", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function actualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { usuario, password, rol } = req.body;

        if (!usuario || !password || !rol) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.query(usuarioQueries.update, [usuario, hashPassword, rol, id]);
        res.json({ message: "Usuario actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function eliminarUsuario(req, res) {
    try {
        const { id } = req.params;
        await db.query(usuarioQueries.delete, [id]);
        res.json({ message: "Usuario eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function usuarioConPedidos(req, res) {
    try {
        const [rows] = await db.query(usuarioQueries.usuariosConMasPedidos);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
