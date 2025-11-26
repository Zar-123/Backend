import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./express.js";

const periodoDeGracia = 5 * 60;
const tiempoDeVida = 10 * 60 * 1000;

export const verificarTokenJWT = (req,res,next) =>{

    let token = null;

    if(req.cookies && req.cookies.access_token){
        token = req.cookies.access_token;
    }

    if(!token && req.headers['authorization']){
        const authHeader = req.headers['authorization'];
        const parts = authHeader.split(' ');
        
        if(parts.length === 2  && parts[0] === 'Bearer'){
            token = parts[1];
        }
    }

    if(!token){
        return res.status(401).json({ error: 'Acceso no autorizado. Se requiere un Token de Acceso (Cookie o Bearer).' });
    }

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
        
        res.clearCookie('access_token');
        res.status(status).json({ error: message }); 
    }
}

export const verificarRol = (rolPermitido) =>{
    return (req,res, next) => {
        if(!req.user || !req.user.role){
            return res.status(500).json({ error: 'Error interno: Rol de usuario no definido en el token.' });
        }

        if(rolPermitido.includes(req.user.role)){
            next();
        }else{
            console.warn(`🚫 Acceso denegado: Usuario ${req.user.username} con rol '${req.user.role}' intentó acceder a ruta restringida.`);
            return res.status(403).json({ error: 'Acceso denegado. No tiene los permisos necesarios para realizar esta acción.' });
        }
    }
}

export const handleJsonError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "JSON mal formado en el cuerpo de la solicitud." });
    }
    next(err);
};