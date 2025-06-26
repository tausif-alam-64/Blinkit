import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { response } from "express";
import generatedAccessToken from "../utils/generatedAcessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide name, email, and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: " Verify email from blinkit",
      html: verifyEmailTemplate({ name, url: verifyEmailUrl }),
    });

    return response.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { code } = request.body;

    const user = await UserModel.findOne({
      _id: code,
    });

    if(!user) {
      return response.status(400).json({
        message: "Invalid user"
      })
    }
    return response.json({
      message: "Verification compleat."
    })
    const updateUser = await UserModel.updateOne({_id: code},{
      verify_email: true
    })
  } catch (error) {
    return res.json({
      message: error,
    });
  }
}
 // login controller
export async function loginController(req, res) {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        message: "Provide email and password correctly.",
        error: true, 
        success: false
      })
    }

    const user = await UserModel.findOne({email});

    if(!user){
      return res.statur(400).json({
        message: "User not register",
        error: true,
        success: false
      })
    }

    if(user.status !== "Active"){
      return res.status(400).json({
        message: "Contect to the admin",
        error: true,
        success: false
      })
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if(!checkPassword){
      return res.status(400).json({
        message: "Check you password again.",
        error: true, 
        success: false
      })
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);
    
    const cookiesOption = {
      httpOnly : true,
      secure: true,
      sameSite: "None"
    }
    res.cookie("accessToken", accessToken,cookiesOption);
    res.cookie("refreshToken", refreshToken,cookiesOption);

    return res.json({
      message: "Login Successfull",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true
    })
  }
}

