import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { name, email, password, role = "viewer", roleCode } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await User.findOne({ email });

    // 🔐 USER EXISTS → VERIFY PASSWORD
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
    }
    // 🆕 NEW USER
    else {
      const hashPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        password: hashPassword,
        role: "viewer",
      });
    }

    // 🔑 ROLE VALIDATION
    if (role === "admin") {
      if (roleCode !== process.env.ADMIN_CODE) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid admin code" });
      }
      user.role = "admin";
    } else if (role === "editor") {
      if (roleCode !== process.env.EDITOR_CODE) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid editor code" });
      }
      user.role = "editor";
    } else {
      user.role = "viewer";
    }

    await user.save();

    // 🔐 TOKEN
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userData: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Backend error during login",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Your data not found May be you are not authorized",
      });
    }
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User data not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "user found successfully", userData });
  } catch (error) {
    console.log("some backend error while fetching the user.");
    return res.status(500).json({
      success: false,
      message: "some backend error while fetching the user.",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res
      .status(200)
      .json({ success: true, message: "You logout successfully" });
  } catch (error) {
    console.log("some backend error while logout");
    return res
      .status(500)
      .json({ success: false, message: "some backend error while logout" });
  }
};
export { login, getUser, logout };
