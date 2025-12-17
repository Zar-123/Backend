import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../express.js';

const mockUserDb = [
    {username: "admin", password: "contraseña123", id: "usuario-1", role: "admin"},
    {username: "guest", password: "guest", id: "usuario-2", role: "guest"}
]

export function generarToken(username, password){
    console.log(`🔍 Intentando login con Username: "${username}" y Password: "${password}"`);
    
    const user = mockUserDb.find(
        u => u.username === username  && u.password === password
    );

    if (!user) {
        const error = new Error("Credenciales inválidas. Usuario no encontrado o contraseña incorrecta.");
        error.status = 401; // Unauthorized
        throw error;
    }
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    }

    try {
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

        console.log(`✅ Token emitido para el usuario: ${user.username}`);

        return ({
            message: "Login exitoso",
            token: token,
            expiresIn: "1 hora"
        })
    } catch (error) {
        console.error("❌ Error al firmar el token JWT:", error);
        const signError = new Error ("Error interno al generar el token")
        signError.status = 500;
        throw signError;
    }
}