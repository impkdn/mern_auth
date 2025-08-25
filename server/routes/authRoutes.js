import express from 'express';
import { register, login, logout } from "../controllers/authController.js";

const authrouter = express.Router();

authrouter.post('/register', register);
authrouter.post('/login', login);
authrouter.post('/logout', logout);

export default authrouter;
