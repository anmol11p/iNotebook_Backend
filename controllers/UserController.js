import userModel from "../model/UserSchema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const getToken = (userId) => {
  const secretkey = process.env.SECRET;
  return jwt.sign(
    {
      id: userId,
    },
    secretkey,
    { expiresIn: "1h" }
  );
};
const userRegisteration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user already existed with this email id" });
    }
    const hashpassword = await argon2.hash(password);
    const user = new userModel({
      name,
      email,
      password: hashpassword,
    });

    await user.save();
    const token = getToken(user._id);
    return res.status(201).json({ message: "registration success", token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "invalid credential!" });
    }
    const verifyPassword = await argon2.verify(userExist.password, password);
    if (!verifyPassword) {
      return res.status(404).json({ message: "invalid credential!" });
    }
    const token = getToken(userExist._id);
    return res.status(201).json({ token, message: "login success" });
  } catch (error) {
    next(error);
  }
};

export { userRegisteration, userLogin };
