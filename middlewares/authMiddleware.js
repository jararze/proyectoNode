const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Configurar dotenv
dotenv.config();

module.exports = (req, res, next) => {
    console.log('Auth middleware ejecutado en ruta:', req.originalUrl);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token del encabezado
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no encontrado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = verified; // Adjuntar información del usuario al request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};
