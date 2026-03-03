import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
import { isEmailValid } from "../utils/emailPattern.js";

const generateJwtToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const authCookieName = "auth-token";
const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/',
    signed: true,
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        if (!isEmailValid.test(email)) {
            return res.status(400).json({ message: "Email is invalid" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/9.x/toon-head/svg?seed=${name}`,
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        if (!isEmailValid.test(email)) {
            return res.status(400).json({ message: 'Email is invalid' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateJwtToken(user);

        res.cookie(authCookieName, token, authCookieOptions);

        res.json({
            message: 'Login successfull!', data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    createdAt: user.createdAt,
                },
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie(authCookieName, {...authCookieOptions, maxAge: 0});
        res.json({ message: 'Logout Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const getMe = async (req, res) => {
    res.json({ message: "User got successfully", data: req.user });
};