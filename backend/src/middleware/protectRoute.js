import { clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // Verify token with Clerk
    const payload = await clerkClient.verifyToken(token);
    const clerkId = payload.sub;

    if (!clerkId) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Find user in database
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ msg: "User not found in database" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    res.status(401).json({ msg: "Authentication failed" });
  }
};
