const users = require("../models/users.model");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../config/nodemailer");
const regex = require("../utils/auth_regex");
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const urlRecoverPassword = process.env.URL_RECOVER;
const saltRounds = 10;

// api/users -------------------------------------------------
const getUserById = async (req, res) => {
  const user = await users.getUserById(req.params.id);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  let userData = req.body;
  try {
    await users.createUser(userData);
    res.status(201).json({
      message: "User Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// /user -------------------------------------------------
const loginUser = async (req, res) => {
  let data;
  try {
    const { email, password } = req.body;
    data = await User.findOne({ email: email }, "-_id -__v");
    if (!data) {
      res.status(400).json({ msg: "Incorrect user or password" });
    } else {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        await User.updateOne({ email: req.body.email }, { logged: true });
        const { email, username } = data;
        const userForToken = {
          email: email,
          username: username,
        };
        const token = jwt.sign(userForToken, jwt_secret, { expiresIn: "20m" });
        res.status(200).json({
          msg: "Logged in",
          token: token,
        });
      } else {
        res.status(400).json({ msg: "Incorrect user or password" });
      }
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

const signUpUser = async (req, res) => {
  let data;
  try {
    const { email, password, username } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    if (regex.validateEmail(email) && regex.validatePassword(password)) {
      data = await User.create({
        email: email,
        password: hashPassword,
        username: username,
        logged: false,
      });
      res.status(201).json(data);
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

const recoverPassword = async (req, res) => {
  try {
    const recoverToken = jwt.sign({ email: req.params.email }, jwt_secret, {
      expiresIn: "20m",
    });
    const url = `${urlRecoverPassword}/user/resetpassword/` + recoverToken;
    await transporter.sendMail({
      to: req.params.email,
      subject: "Recover Password",
      html: `<h3>Recover Password</h3>
              <a href = ${url}>Click to recover password</a>
              <p>Link will expire in 20 minutes</p>`,
    });
    res.status(200).json({
      message: "A recovery email has been sent to your email",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const recoverToken = req.params.recoverToken;
    const payload = jwt.verify(recoverToken, jwt_secret);
    const password = req.body.password;
    if (regex.validatePassword(password)) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: hashPassword }
      );
    } else {
      res.status(400).json({
        msg: "Password must have at least 8 characters, one uppercase, one lowercase and one special character",
      });
    }
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log("Error:", error);
  }
};

const logout = async (req, res) => {
  try {
    // req.decoded comes from protectedRoute (verifiedToken.js) middleware
    const email = req.decoded.email;
    await User.updateOne({ email }, { logged: false });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
  signUpUser,
  recoverPassword,
  resetPassword,
  logout,
};
