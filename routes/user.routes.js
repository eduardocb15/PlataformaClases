import express from "express";
import userController from "../controllers/user/index.controller.js";
import securityMiddelware from "../middlewares/security/primer.middleware.js";

const router = express.Router();

router.get("/users/hola", securityMiddelware, userController.saludar);
router.get("/users/chau", securityMiddelware, userController.despedir);

export default router;
