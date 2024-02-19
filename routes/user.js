import express from "express";
import {
    getUser,
    getAllUsers,
    updateUser,
} from "../controllers/userController.js";
import { isLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isLogin, getAllUsers);
router.get("/:id", isLogin, getUser);
router.put("/:id", isLogin, updateUser);

export default router;