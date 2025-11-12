import express from "express";
import rutaUsuario from "./rutas/rutasUsuario.js"

const app = express();
app.use(express.json());

//Hola mundo
app.get("/",(req,res) =>{
    res.send("HOLA MUNDO");
});

app.use("/users", rutaUsuario);

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
})