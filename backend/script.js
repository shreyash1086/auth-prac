import express from "express";
import mongoose from "mongoose";
import twilio from "twilio";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { UserAuthModel, UserInfoModel } from "./UserSchema.js";

dotenv.config();
const app = express();
const SECRET = process.env.SECRET;
const USER = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const MONGO_URL = process.env.MONGO_URL
// console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

const ACCOUNTSID = process.env.ACCOUNTSID;
const AUTHTOKEN = process.env.AUTHTOKEN;
const FROM = process.env.FROM;
const PORT = process.env.PORT;
const client = twilio(ACCOUNTSID, AUTHTOKEN);
const otpStore = {};

app.post("/signup", async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    res.status(400).json({
      success: false,
      message: "email or phone required",
    });
  }

  const newUserData = {};
  if (email) newUserData.email = email;
  if (phone) newUserData.phone = phone;

  try {
    await UserAuthModel.create(newUserData);

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, phone, password } = req.body;

  console.log("Received signin request:", req.body);

  try {
    const user = await UserAuthModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    console.log("Found user:", user);

    if (!user) {
      console.log("No user found");
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "User not verified",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id.toString() }, SECRET);

    if (valid) {
      res.json({
        success: true,
        token: token,
        message: "Successfully logged in",
      });
    }
  } catch (error) {
    console.log("Signin error:", error);
    res.status(403).json({
      success: false,
      error: error.message,
      message: "Invalid Credentials",
    });
  }
});

app.post("/send-otp", async (req, res) => {
  const { email, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // generate 6 digit otp
  const number = parseInt(phone);
  console.log("Send otp");
  
  try {
    const result = await UserAuthModel.updateOne(
      { $or: [{ phone }, { email }] },
      { verified: false }
    );

    if (phone) {
      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: FROM,
        to: `+91${number}`,
      });
      otpStore[phone] = otp;
      console.log("Executed Phone");
      
    } else if (email) {
      let mailOptions = {
        from: USER,
        to: email,
        subject: "Your OTP Code",
        html: `<h1>This is mail for your account verification</h1></br>
        <h2>Your OTP is ${otp}</h2>
        <p>please verify your account</p>
        `,
      };
      const res = await transporter.sendMail(mailOptions);
      otpStore[email] = otp;
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log("error",err);
    res.json({
      success: false,
      message: err,
    });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, phone, otp } = req.body;

  if ((!email && !phone) || !otp) {
    return res.json({
      message: "Phone number and OTP are required",
    });
  }

    const key = phone ? phone : email;
    const storedOtp = otpStore[key];

  if (parseInt(otp) === storedOtp) {
    const result = await UserAuthModel.updateOne(
      { $or: [{ phone }, { email }] },
      { verified: true }
    );

    if (result.modifiedCount === 1) {
      delete otpStore[phone]; //remove after successfull verification
      return res.json({ success: true });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found kay bin ka yaar" });
    }
  } else {
    return res.json({ success: false, message: "Invalid OTP" });
  }
});

app.post("/set-password", async (req, res) => {
  const { phone, email, password } = req.body;
  const HashPassword = await bcrypt.hash(password, 3);

  try {
    const result = await UserAuthModel.updateOne(
      { $or: [{ phone }, { email }] },
      { password: HashPassword }
    );

    if (result.modifiedCount === 1) {
      return res.json({ success: true, message: "Successfull" });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Error white set password",
    });
  }
});

app.post("/reset-password", async (req, res) => {
  const { password, email, phone } = req.body;
  const HashPassword = await bcrypt.hash(password, 3);

  try {
    const result = await UserAuthModel.updateOne(
      { $or: [{ phone }, { email }] },
      { password: HashPassword }
    );

    if (result.modifiedCount === 1) {
      return res.json({ success: true, message: "Reset Successfull" });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Error white reset password",
    });
  }
});

app.post("/user-details", async (req, res) => {
  const userId = req.userId;
  const { firstname, lastname, age, address, gender, profession } = req.body;
  if (!firstname || !lastname || !age || !address || !gender || !profession) {
    return res.json({
      success: false,
      message: "require all the fields",
    });
  }
  try {
    await UserInfoModel.create({
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      age: age,
      address: address,
      gender: gender,
      profession: profession,
    });

    res.json({
      success: true,
      message: "profile generated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

async function main() {
  await mongoose.connect(
    MONGO_URL
  );
  app.listen(PORT, () => {
    console.log("Listening to port 3000");
  });
}

main();
