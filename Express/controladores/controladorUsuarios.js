import { obtenerTodosLosUsuarios,obtenerUsuariporID, crearUsuario, actualizarUsuario, elimiarUsuario} from "../servicios/serviciosUsuarios";

export const getAllusers = (req,res,next) => {
    try {
        const users = obtenerTodosLosUsuarios()
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}