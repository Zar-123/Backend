import express from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../express.js";

const authRouter = express.Router();

const mockUserDb = [
    {username: "admin", password: "contraseña123", id: "usuario-1", role: "admin"},
    {usurname: "guest", password: "guest", id: "usuario-2", role: "guest"}
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
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

        console.log(`✅ Token emitido para el usuario: ${user.username}`);

        res.json({
            message: "Login exitoso",
            token: token,
            expiresIn: "1 hora"
        })
    } catch (error) {
        console.error("❌ Error al firmar el token JWT:", error);
        res.status(500).json({error: "Error interno al generar el token"})
    }
})

export default authRouter;