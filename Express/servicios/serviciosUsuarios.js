import { getUsers, saveUsers } from "../data.js";
import {v4 as uuidv4} from 'uuid';

export function obtenerTodosLosUsuarios(){
    return getUsers();
}

export function obtenerUsuariporID(id){
    const users = getUsers();
    return users.find(u => u.id == id);
}

export function crearUsuario(nuevoUsuario){
    if(!nuevoUsuario || !nuevoUsuario.name){
        const error = new Error("El campo 'name' es obligatorio para crear un usuario");
        error.status = 400;
        throw error;
    }

    const users = getUsers();
    const verificarNombre  = nuevoUsuario.name.trim().toLowerCase();
    const nombreRepetido = users.find(u => u.name.trim().toLowerCase() === verificarNombre);

    if (nombreRepetido) {
        const error = new Error(`El usuario con el nombre '${nuevoUsuario.name}' ya existe.`);
        error.status = 409; // Conflict
        error.idExistente = nombreRepetido.id;
        throw error;
    }

    const idNuevo = uuidv4();
        const usuarioNuevo = {
            id: idNuevo,
            name: nuevoUsuario.name
    }

    users.push(usuarioNuevo);
    saveUsers();

    console.log(`Usuario ID ${usuarioNuevo.id} agregado: ${usuarioNuevo.name}`);
    return usuarioNuevo;
}

export function actualizarUsuario(idActualizar, datosActualizados){
    const {name} = datosActualizados;
    const users = getUsers();

    if (!name) {
        const error = new Error("El campo 'name' es obligatorio para actualizar el usuario.");
        error.status = 400;
        throw error;

    }

    const indice = users.findIndex(user => user.id === idActualizar);
    if (indice === -1) {
        const error = new Error(`Usuario con ID ${idActualizar} no encontrado.`);
        error.status = 404;
        throw error;
    }
    users[indice].name = name;
    saveUsers();
    const usuarioActualizado = users[indice];
    console.log(`Usuario ID ${idActualizar} actualizado a: ${usuarioActualizado.name}`);
    return usuarioActualizado;
}

export function elimiarUsuario(idEliminar){
    const users = getUsers;

    const indice = users.findIndex(user => user.id === idEliminar)

    if (indice === -1) {
        const error = new Error(`Usuario con ID ${idEliminar} no encontrado.`);
        error.status = 404;
        throw error;
    }
    const usuarioEliminado = users.splice(indice,1);
    saveUsers()

    console.log(`Usuario ID ${idEliminar} eliminado: ${usuarioEliminado[0].name}`);
    return usuarioEliminado[0];
}