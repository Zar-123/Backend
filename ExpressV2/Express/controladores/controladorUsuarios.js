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
        const idBuscar = req.params.id;
        const usuario = obtenerUsuariporID(idBuscar);
        
        if(!usuario){
            return res.status(404).json({
                error: `Usuario con ID ${idBuscar} no encontrado.`
            })
        }
    } catch (error) {
        next(error);
    }
}

export const createUser = (req, res, next) => {
    try{
        const nuevo = req.body;

        const usuarioNuevo = crearUsuario(nuevo);
        res.status(201).json(usuarioNuevo);
    }catch(error){
        if(error.status === 409){
            return res.status(409).json({
                error: error.message,
                idExistente: error.idExistente
            });
        }
        next(error);
    }
}

export const updateUser = (req, res, next) => {
    try{
        const idActualizar = req.params.id;
        const datosActualizados = req.body;

        const usuarioActualizado = actualizarUsuario(idActualizar, datosActualizados);
        res.status(200).json(usuario);

    }catch(error){
        next(error);
    }
}

export const deletUser = (req, res, next) =>{
    try {
        const idEliminar = req.params.id;
        elimiarUsuario(idEliminar);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}