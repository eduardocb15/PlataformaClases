import express from "express";
import userController from "../controllers/user/index.controller.js";

const router = express.Router();

router.post("/users/register", userController.register);

//CAMBIAR GET A POST Y PROBAR POR POSTMAN
router.get("/users/validate/:registrationCode", userController.validate);

router.post("/users/login", userController.login);

export default router;
