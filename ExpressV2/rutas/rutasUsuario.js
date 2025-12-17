import express from "express";
import { getAllUsers, getUserByID, createUser, updateUser, deleteUser} from "../controladores/controladorUsuarios.js";
import { verificarTokenJWT } from "../middleware.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByID);
userRouter.get("/", verificarTokenJWT, createUser);
userRouter.get("/:id", verificarTokenJWT, deleteUser)
userRouter.get("/:id",verificarTokenJWT , updateUser);

export default userRouter;
