import { writeFileSync, readFile, readFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = path.join(process.cwd(), 'users.json');

let users = [];

const INITIAL_USERS = [
    { id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'Ana' },
    { id: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210', name: 'Luis' },
    { id: '1a2b3c4d-5e6f-7890-abcd-ef0123456789', name: 'Carla' },
];

export function loadUsers(){
    try{
        console.log("Ruta del archivo: ", DATA_FILE);
        const data = readFileSync(DATA_FILE, 'utf-8');

        const parseData = data.trim() ? JSON.parse(data) : [];
        users = parseData;
    }
}

writeFileSync(filePath, JSON.stringify(users, null, 2));
console.log(`✅ Archivo users.json creado en:\n${filePath}`);

readFile(filePath, 'utf8', (err, data) => {
    if(err){
        console.error('❌ Error al leer el archivo:', err);
        return
    }

    const parsedUsers = JSON.parse(data);
    console.log('📂 Contenido leído desde el archivo:', parsedUsers);
})




