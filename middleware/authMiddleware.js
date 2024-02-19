import JWT from "jsonwebtoken"
// import User from "../models/UserModel.js"


const isLogin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ success: false, message: "Auth failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Auth failed" });
  }
};

// const isLogin = async (req, res, next) => {
//     let token;
  
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         token = req.headers.authorization.split(" ")[1];
  
//         const payload = jwt.verify(token, jwtSecret);
  
//         req.user = await User.findById(payload._id).select("-password");
//         if (!req.user) {
//           throw new Error("Invalid user account");
//         }
  
//         next();
//       } 
//       catch (error) {
//         console.error(error);
//         return res.status(401).json({ msg: "Please login to continue" });
//       }
//     }
  
//     if (!token) {
//       res.status(401).json({ msg: "Please login to continue" });
//     }
// };

export { isLogin };