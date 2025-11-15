import { verifyToken } from "@clerk/backend";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // Verify token with Clerk secret key
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    const clerkId = payload.sub;

    if (!clerkId) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    res.status(401).json({ msg: "Authentication failed" });
  }
};
