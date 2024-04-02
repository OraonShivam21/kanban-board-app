import express from "express";
import { userRegister, userLogin } from "../controllers/user.controllers";

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);

export default router;
