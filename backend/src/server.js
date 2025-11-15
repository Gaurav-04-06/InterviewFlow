import express from "express";
import { ENV } from "./lib/env.js"; // ✅ Change from ../lib/env.js to ./lib/env.js
import cors from "cors";
import { connectDB } from "./lib/db.js"; // ✅ Also fix this
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js"; // ✅ Also fix this
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js"; // ✅ Add routes/ path
import sessionRoutes from "./routes/sessionRoutes.js"; // ✅ Add routes/ path
import User from "./models/User.js"; // ✅ Also fix this

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// Inngest middleware
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: functions,
    servePath: "/api/inngest",
    landingPage: true,
  })
);

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Add Clerk webhook handler
app.post("/api/webhook/clerk", async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log("📥 Received Clerk webhook:", type);

    await inngest.send({
      name: `clerk/${type}`,
      data: data ,
    });

    console.log("✅ Event forwarded to Inngest");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// Debug endpoint
app.get("/api/debug/user", clerkMiddleware(), async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    console.log("🔍 Debug - Clerk ID:", clerkId);

    if (!clerkId) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    const user = await User.findOne({ clerkId });
    console.log("🔍 Debug - User in DB:", user);

    res.json({ clerkId, userInDB: !!user, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const startUp = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
    console.log(
      "Signing key:",
      ENV.INNGEST_SIGNING_KEY ? "Loaded ✅" : "Missing ❌"
    );
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startUp();
