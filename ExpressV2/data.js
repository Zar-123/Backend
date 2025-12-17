import { writeFileSync, readFile, readFileSync } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'users.json');

let users = [];

const INITIAL_USERS = [
    { id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'Ana' },
    { id: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210', name: 'Luis' },
    { id: '1a2b3c4d-5e6f-7890-abcd-ef0123456789', name: 'Carla' },
];

export function loadUsers(){
    try{
        console.log('Ruta del archivo:', DATA_FILE);
        const data = readFileSync(DATA_FILE,  'utf-8');

        const parsedData = data.trim() ? JSON.parse(data) : [];
        users = parsedData;

        console.log(`✅ Datos cargados correctamente. Usuarios: ${users.length}`);
    }catch(error){
        if(error.code === "ENOENT"){
            console.log(`⚠️ Archivo ${DATA_FILE} no encontrado. Creando archivo inicial.`);
            users = INITIAL_USERS;
            saveUsers();
            console.log(`✅ Archivo users.json creado y guardado.`);
        } else{
            console.error("❌ Error grave al cargar o parsear los datos:", error);
            users = [];
        }

    }
}

export function saveUsers(){
    try{
        const data = JSON.stringify(users,null,2);
        writeFileSync(DATA_FILE, data, 'utf-8');
        console.log(`💾 Datos guardados correctamente.`);

    }catch(error){
        console.error("❌ Error al guardar los datos:", error);
        throw new Error("No se pudieron guardar los datos en el disco.");

    }
}

export function getUsers(){
    return users;
}




