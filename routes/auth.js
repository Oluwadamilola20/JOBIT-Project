import express from "express";
import { signup, signin, logout, activate } from "../controllers/authControllerr.js";
// import { signin, signup, activate } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/activate/:activationToken", activate);

export default router;