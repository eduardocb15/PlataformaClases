import express from "express";
import userController from "../controllers/user/index.controller.js";
import { authUser } from "../middlewares/security/index.middleware.js";
import { userExists } from "../middlewares/users/index.middleware.js";

const router = express.Router();

router.post("/users/register", userController.register);

//CAMBIAR GET A POST Y PROBAR POR POSTMAN
router.get("/users/validate/:registrationCode", userController.validate);

router.post("/users/login", userController.login);

router.get("/users/profile", authUser, userExists, userController.profile);

export default router;
