import {Router} from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", protect, logoutUser);
authRouter.get("/", protect, getMe);

export default authRouter;