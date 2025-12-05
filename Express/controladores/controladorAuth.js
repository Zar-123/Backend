import { generarToken } from "../servicios/servicioAuth";

export const login = (req, res, next) => {
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({ error: "Faltan credenciales (username y password)" });
        }
        const tokenData = generarToken(username, password);
        console.log(`✅ Token emitido para el usuario: ${user.username}`);
        res.json(tokenData);
    } catch (error) {
        next(error);
    }
}
