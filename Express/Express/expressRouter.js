import express from 'express';

const app = express();
app.use(express.json());

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log(`📦 Middleware del router → ${req.method} ${req.url}`);
  next();
});

userRouter.get("/",(req,res) =>{
    res.json([{id : 1 , name: 'User from router'}])
});

userRouter.get("/hola",(req,res) =>{
    res.send("Hola desde el router")
});

userRouter.post("/", (req,res) =>{
    const user = req.body;
    user.id = Math.floor(Math.random() * 1000);
    res.status(201).json(user);
});

app.use("/api/users", userRouter);

app.get("/",(req,res) =>{
    res.send('🏠 Bienvenido! Visitá /api/users para probar el router.');
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Express con Router corriendo en http://localhost:${PORT}`);
});