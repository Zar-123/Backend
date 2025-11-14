import express from "express";
import rutaUsuario from "./rutas/rutasUsuario.js"
import { loadUsers } from "./data.js";
import { handleJsonError, verificarApiKey } from "./middleware.js";

const app = express();
app.use(express.json());
app.use(handleJsonError);

//Hola mundo
app.get("/",(req,res) =>{
    res.send("HOLA MUNDO");
});

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
})