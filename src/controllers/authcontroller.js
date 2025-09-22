import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuarioQueries } from '../queries/usuarioQueries.js';
import { env } from '../config/env.js';

export async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ error: "Debe enviar usuario y contraseña" });
        }

        const [rows] = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
        if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

        const userRol = user.rol;

        const token = jwt.sign(
            { id: user.id, usuario: user.usuario, rol: userRol },
            env.jwt.secret,
            { expiresIn: env.jwt.expiresIn }
        );

        res.json({ message: "Login exitoso", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function register(req, res) {
    try {
        const { usuario, password, rol } = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        const hashPassword = await bcrypt.hash(password, env.bcryptRounds);
        const userRol = rol || "user";

        const [result] = await db.query(usuarioQueries.create, [usuario, hashPassword, userRol]);

        res.status(201).json({ message: "Usuario registrado", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};