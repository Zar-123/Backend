import express from "express";
import { getUsers, saveUsers } from "../data.js";
import {v4 as uuidv4} from 'uuid';
import { verificarApiKey } from "../middleware.js";

const userRouter = express.Router();

//Leer
userRouter.get("/",(req,res) =>{
    const users = getUsers();
    res.json(users);
})

//Buscar por ID
userRouter.get("/:id", (req,res) => {
    const idBuscar = req.params.id;
    const users = getUsers();
    const usuario = users.find(u => u.id === idBuscar);
    
    if(!usuario){
        return res.status(404).json({
            error: `Usuario con ID ${idBuscar} no encontrado.`
        });
    }
    res.json(usuario);
});

//Crear
userRouter.post("/", verificarApiKey, (req,res) =>{
    try {
        const nuevo = req.body;

        if(!nuevo || !nuevo.name){
            return res.status(400).json({error : "El campo 'name' es obligatorio para crear un usuario." });
        }

        const users = getUsers();
        const verificarNombre  = nuevo.name.trim().toLowerCase();
        const nombreRepetido = users.find(u => u.name.trim().toLowerCase() === verificarNombre);

        if(nombreRepetido){
            console.log("Nombre Repetido");
            return res.status(409).json({
                error: `El usuario con el nombre '${nuevo.name}' ya existe.`,
                idExistente: nombreRepetido.id
            })
        }else{
            console.log("Nuevo usuario : ", nuevo);
        }

        const idNuevo = uuidv4();
        const usuarioNuevo = {
            id: idNuevo,
            name: nuevo.name
        }

        users.push(usuarioNuevo);
        saveUsers();

        console.log(`Usuario ID ${usuarioNuevo.id} agregado: ${usuarioNuevo.name}`);
        
        res.status(201).json(usuarioNuevo);
    } catch (error) {
        next(error);
    }
})

//Eliminar
userRouter.delete("/:id",verificarApiKey ,(req,res) =>{
    try {
        const idEliminar = req.params.id;
        const users = getUsers();

        const indice = users.findIndex(user => user.id === idEliminar)
        if(indice === -1){
            return res.status(404).json({
                error: `Usuario con ID ${idEliminar} no encontrado.`
            });
        }
        const usuarioEliminado = users.splice(indice,1);

        saveUsers();
        console.log(`Usuario ID ${idEliminar} eliminado: ${usuarioEliminado[0].name}`);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

//Actualizar
userRouter.put("/:id",verificarApiKey, (req,res) => {
    try {
        const idActualizar = req.params.id;
        const { name } = req.body;
        const users = getUsers();

        if(!name){
            return res.status(400).json({ errror: "El campo 'name' es obligatorio para actualizar el usuario." });
        }
        
        const indice = users.findIndex(user => user.id === idActualizar);
        if(indice === -1){
            return res.status(404).json({
                error: `Usuario con ID ${idActualizar} no encontrado.`
            });
        }

        users[indice].name = name;
        saveUsers();
        const usuarioActualizado = users[indice];
        console.log(`Usuario ID ${idActualizar} actualizado a: ${usuarioActualizado.name}`);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        next(error);
    }
});


export default userRouter;
