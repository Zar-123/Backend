import express from "express";
import rutaUsuario from "./rutas/rutasUsuario.js"
import rutasAuth from "./rutas/rutasAuth.js";
import { loadUsers } from "./data.js";
import { handleJsonError } from "./middleware.js";

const app = express();
app.use(express.json());
app.use(handleJsonError);

export const JWT_SECRET = "123";

//Hola mundo
app.get("/",(req,res) =>{
    res.send("HOLA MUNDO. Usa /auth/login para obtener un token");
});

app.use("/auth", rutasAuth);

app.use("/users", rutaUsuario);

app.use((err,req,res,next) => {
    const status = err.status || 500;
    console.error(`❌ Error en el servidor (${status}):`, err.message);
    res.status(status).json({
        error: err.message || "Algo salió mal en el server",
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
})


const PORT = 3000;

loadUsers();

app.listen(PORT, () =>{
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
    console.log(`🔑 Clave secreta simulada: ${JWT_SECRET}`);
    console.log(`➡️  Login: POST http://localhost:${PORT}/auth/login`);
})