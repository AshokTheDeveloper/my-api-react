const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const goHome = async (req, res) => {
  try {
    const dbUser = await User.find();
    if (!dbUser) {
      res.status(401).json({ user: { message: "User not found" } });
    } else {
      const dbUsers = await User.find();
      res.status(200).json({ users: dbUsers });
    }
  } catch (error) {
    console.log("Server error: ", error.message);
  }
};

const signup = async (req, res) => {
  const { name, gender, email, password } = req.body;
  console.log(name, gender, email, password);
  try {
    const user = await User.findOne({ name });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const dbUser = await User.create({
        name,
        email,
        gender,
        password: hashedPassword,
      });
      res.status(201).json({ user: dbUser });
    } else {
      res.status(401).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log("Server error: ", error.message);
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const dbUser = await User.findOne({ name });
    if (!dbUser) {
      res.status(401).json({ message: "Invalid user" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
      if (!isPasswordMatch) {
        res.status(401).json({ message: "Invalid password" });
      } else {
        res.status(200).json({ message: "User Logged In" });
      }
    }
  } catch (error) {
    console.log("Server error: ", error.message);
  }
};

module.exports = { goHome, signup, login };
