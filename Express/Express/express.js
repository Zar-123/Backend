import express from "express";
import rutaUsuario from "./rutas/rutasUsuario.js"
import rutasAuth from "./rutas/rutasAuth.js";
import { loadUsers } from "./data.js";
import { handleJsonError } from "./middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(handleJsonError);
app.use(cookieParser());

export const JWT_SECRET = "123";

//Hola mundo
app.get("/",(req,res) =>{
    res.send("HOLA MUNDO. Usa /auth/login para obtener un token");
});

app.use("/auth", rutasAuth);

app.use("/users", rutaUsuario);

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err.message || "Algo salio mal en el server"
    });
})


const PORT = 3000;

loadUsers();

app.listen(PORT, () =>{
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
    console.log(`🔑 Clave secreta simulada: ${JWT_SECRET}`);
    console.log(`➡️  Login: POST http://localhost:${PORT}/auth/login`);
})