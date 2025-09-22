import jwt from "jsonwebtoken";
import { env } from '../config/env.js';

export function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No estás autenticado" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.jwt.secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

export function autorizarRol(rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
}