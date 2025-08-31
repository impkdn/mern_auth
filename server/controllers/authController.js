import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { json } from "express";
import transporter from "../config/nodemailer.js";

// register api endpoint hit function
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const user = new userModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending email

    const mailOptions = {
      from: '"Lift buddy" piyush.jld@gmail.com',
      to: email,
      subject: "welcome to liftBuddy!",
      text: `hi Buddy Welcome to ride with me. You are a member of liftbuddy with id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: " user creayted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login api endpoint hit function

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      massege: "email and password are required!",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, massege: "invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, massege: "password invalid" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 1000,
    });

    return res.json({ success: true, massege: "YOu are logged in" });
  } catch (error) {
    return res.json({ success: false, massege: error.massege });
  }
};

// logout api endpoint hit function

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, massege: "logged out" });
  } catch (error) {
    return res.json({ success: false, massege: error.massege });
  }
};


// send verification otp

export const sendVerifyOtp = async (req, res) => {
  try {
    const  { userId } = req.body;
    
    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, massege: "account already varufied" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.varifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    user.varifyOtp = otp;
    
    await user.save();

    const mailOptions = {
      from: '"Lift buddy" piyush.jld@gmail.com',
      to: user.email,
      subject: "liftBuddy! account varification otp",
      text: `varify this email using this otp: ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      massege: "varification otp sent to registerd email",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.massege });
  }
};

// varify email api

export const varifyemail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, massege: "missing details" });
  }

  try {
    const user = await userModel.findById({userId});
    if (!user) {
      return res.json({ success: false, massege: "user not found" });
    }
    if (user.varifyOtp === "" || user.varifyOtp !== otp) {
      return res.json({ success: false, massege: "otp invalid" });
    }
    if (user.varifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, massege: "otp expaired" });
    }
    user.isAccountVerified = true;
    user.varifyOtp = "";
    user.varifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: false, massege: "email varified successfuly" });
  } catch (error) {
    return res.json({ success: false, massege: error.massege });
  }
};

// cheking user is autheniticated or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, massege: error.massege });
  }
};

// send password reset otp
export const sendResetOtp = async (req, res) => {
  const {email} = req.body;
  if(!email){
    return res.json({success: false, message: "email nót provided"})
  }
  try {
    const user = await userModel.findOne({email});

    if (!user){
      return res.json({success: false, message: "user nót found"})

    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = 15 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: '"Lift buddy" piyush.jld@gmail.com',
      to: user.email,
      subject: "liftBuddy! password reset otp",
      text: `RESET Password using this otp: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({success: true, message: "reset otp sent to registerst email"})
  } catch (error) {
    return res.json({success: false, message: error.message})
    
  }
}

// verify otp and reset password

export const resetPassword = async(req, res) => {
  const {email, otp, newPassword} = req.body;
  if(!email|| !otp || !newPassword){
    return res.json({success: false, message: "credentials missing"})
  }
  try {
    const user = userModel.findOne({email});
    if(!user){
      return res.json({success: false, message: "user is not found with this email"})
      
    }
    if(user.resetOtp === '' || user.resetOtp !== otp){
      return res.json({success: false, message: "invalid otp"})
      
    }
    if(user.resetOtpExpireAt < Date.now()){
      
      return res.json({success: false, message: "otp expired"})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 6);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0 ;
    
    await user.save()
    
    return res.json({success: true, message: "password has been reset successfully"})

  } catch (error) {
    
    return res.json({success: false, message: error.message})
  }
}

