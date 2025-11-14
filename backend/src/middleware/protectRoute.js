import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth({
    signInUrl: "/sign-in",
  }),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId)
        return res.status(401).json({ msg: "Unauthorized: No Clerk ID found" });

      // find the user in the database
      const user = await User.findOne({ clerkId });

      if (!user)
        return res.status(400).json({ msg: "User not found in database" });

      req.user = user; // attach user to request object
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);
      res.status(500).json({ msg: "Server error in authentication" });
    }
  },
];
