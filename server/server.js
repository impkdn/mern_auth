// install below packeges after initialising npm init 

// each package has its own functionality

// npm i express cors dotenv nodemon jsonwebtoken mongoose bcryptjs nodemailer cookie-parser
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authrouter from "./routes/authRoutes.js";

const app = express();

const port = process.env.PORT || 4000
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credential: true}));

// API End Points
app.get("/", (req,res) => res.send("API working") )
app.use('/api/auth', authrouter)
app.listen(port, () => console.log(`Server is started on PORT : ${port}`));
