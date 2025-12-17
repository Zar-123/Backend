import express from "express.js";
import { login } from "../controladores/controladorAuth.js";

const authRouter = express.Router();

authRouter.post("/login", login);

export default authRouter;