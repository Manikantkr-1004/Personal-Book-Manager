import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const cookieName= "auth-token";
        let token = req.signedCookies?.[cookieName];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await UserModel.findById(decoded.id).select("-password").lean();

        if (!user) {
            return res.status(401).json({ message: "User not exist, Kindly Refresh" });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid/missing token", error: error.message });
    }
};