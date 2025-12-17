import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./express.js";

export const verificarTokenJWT = (req,res,next) =>{
    const authRouter = req.headers['authorization'];

    if(!authRouter) {
        return res.status(404).json({ error: 'Acceso no autorizado. Se requiere un Token de Acceso.' });
    }

    const parts = authRouter.split(' ');
    if(parts.length !==  2 || parts[0] !== 'Bearer'){
        return res.status(401).json({error: 'Formato de token inválido. Use formato Bearer: Bearer <token>.' });
    } 
    
    const token = parts[1];

    try {
        const decoded = jwt.verify(token,JWT_SECRET);

        req.user = decoded;
        console.log(`🔑 Token JWT validado para el usuario: ${req.user.username} (Role: ${req.user.role})`);
        next(); 
    } catch (error) {
        console.warn("🚫 Intento de acceso denegado. Token inválido o expirado:", error.message);
        
        // Handle common JWT errors
        let status = 403; // Forbidden
        let message = 'Token de acceso inválido o expirado.';

        if (error.name === 'TokenExpiredError') {
             message = 'El token ha expirado. Por favor, vuelva a iniciar sesión.';
        } else if (error.name === 'JsonWebTokenError') {
             message = 'Firma de token inválida.';
        }
        
        res.status(status).json({ error: message }); 
    }
}

export const handleJsonError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "JSON mal formado en el cuerpo de la solicitud." });
    }
    next(err);
};