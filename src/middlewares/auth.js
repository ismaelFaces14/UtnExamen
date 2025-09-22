const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretoUTN";

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No estás autenticado" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

function autorizarRol(rolesPermitidos) {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
}

module.exports = { autenticarToken, autorizarRol };