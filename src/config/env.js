require("dotenv").config();

const env = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 3309),
        user: process.env.DB_USER || 'utnuser',
        pass: process.env.DB_PASS || 'utnpass',
        name: process.env.DB_NAME || 'UTNExamen',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret0C0ntrr',
        expiresIn: process.env.JWT_EXPIRES_IN || 'id',
    },
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10),
};

module.exports = { env };