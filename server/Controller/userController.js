import ErrorHandler from "../middleware/Error.js";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 500));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(
      new ErrorHandler("Email already existed please login again", 500)
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Registered successfully...",
    user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email & password is required...", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User does not existed"));
  }

  const validPassword = await user.comparePassword(password);

  if (!validPassword) {
    return next(new ErrorHandler("Please enter correct password", 400));
  }

  user.password = undefined;

  const token = await user.generateJsonWebToken();

  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "user login successfully",
    user,
    token,
  });
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};
