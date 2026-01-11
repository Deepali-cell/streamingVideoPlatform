import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWTSECRET);

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("some backend middleware error...");
    return res
      .status(500)
      .json({ success: false, message: "backend middleware error" });
  }
}
