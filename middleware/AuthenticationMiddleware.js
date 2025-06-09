import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(404).json({ message: "token is not founded..!" });
    }
    token = token.replace("Bearer ", "");
    const tokenData = await jwt.verify(token, process.env.SECRET);
    req.user = tokenData.id;
    next();
  } catch (error) {
    const status = 400;
    const message = "error in auth middleware";
    const extraDetails = error?.message;
    const err = { message, extraDetails, status };
    next(err);
  }
};

export default authMiddleware;
