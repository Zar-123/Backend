import express from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../express.js";

const authRouter = express.Router();

const mockUserDb = [
    {username: "admin", password: "contraseña123", id: "usuario-1", role: "admin"},
    {username: "guest", password: "guest", id: "usuario-2", role: "guest"}
]

authRouter.post("/login", (req,res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(404).json({error : "Faltan credenciales (username y password)"});
    }  

    const user = mockUserDb.find(
        u => u.username === username  && u.password === password
    );

    if(!user){
        return res.status(404).json({error: "Credenciales invalidas"})
    }

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    }

    try {
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '10m'});

        res.cookie('access_token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000
        })

        console.log(`✅ Token emitido para el usuario: ${user.username} y enviado a cookie`);

        res.json({
            message: "Login exitoso,Token enviado en cookie 'access_token",
            expiresIn: "10 minutos",
            user: { id:user.id, username:user.username, role:user.role }
        })
    } catch (error) {
        console.error("❌ Error al firmar el token JWT:", error);
        res.status(500).json({error: "Error interno al generar el token"})
    }
})

authRouter.post("/logout", (req,res) => {
    res.clearCookie('access_token');
    console.log("Sesion cerrada y cookie eliminada");
    res.json({message: "Sesion cerrada correctamente"});
})

export default authRouter;