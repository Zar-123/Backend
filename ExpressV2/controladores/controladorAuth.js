import { generarToken } from "../servicios/servicioAuth.js";

export const login = (req, res, next) => {
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({ error: "Faltan credenciales (username y password)" });
        }
        const tokenData = generarToken(username, password);

        res.json(tokenData);
    } catch (error) {
        next(error);
    }
}
