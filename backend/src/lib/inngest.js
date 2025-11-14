import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "interviewFlow",
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8288"
      : undefined,
});

export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    return await step.run("save-user-to-db", async () => {
      await connectDB();

      const userData = event.data.data;

      if (!userData) {
        console.error("❌ No user data found in event");
        return { success: false, error: "No user data found" };
      }

      const { id, first_name, last_name, image_url } = userData;
      const email = userData.email_addresses?.[0]?.email_address || null;

      const newUser = {
        clerkId: id,
        email: email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      };

      const user = await User.create(newUser);
      console.log("✅ User saved to MongoDB:", user);

      // Create Stream user
      try {
        await upsertStreamUser({
          id: newUser.clerkId.toString(),
          name: newUser.name,
          image: newUser.profileImage,
        });
        console.log("✅ User saved to Stream successfully");
      } catch (streamError) {
        console.error(
          "⚠️ Stream user creation warning (non-blocking):",
          streamError.message
        );
      }

      return { success: true, userId: user._id };
    });
  }
);

export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    return await step.run("delete-user", async () => {
      await connectDB();

      const userData = event.data.data;

      if (!userData) {
        console.error("❌ No user data found in event");
        return { success: false, error: "No user data found" };
      }

      const { id } = userData;
      const result = await User.deleteOne({ clerkId: id });
      console.log("✅ User deleted from MongoDB:", id);

      // Delete Stream user
      try {
        await deleteStreamUser(id.toString());
        console.log("✅ User deleted from Stream successfully");
      } catch (streamError) {
        console.error(
          "⚠️ Stream user deletion warning (non-blocking):",
          streamError.message
        );
      }

      return { success: true, deletedCount: result.deletedCount };
    });
  }
);

export const functions = [syncUser, deleteUserFromDB];
