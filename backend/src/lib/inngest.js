import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";
import User from "../models/User.js";

// ------------------ Inngest Client ------------------
export const inngest = new Inngest({
  id: "interviewFlow",
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8288"
      : undefined,
});

// Helper: Get Clerk user safely (supports all formats)
const getClerkUser = (event) => {
  return event.data?.object || event.data || null;
};

// ------------------ User Created ------------------
export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    return await step.run("save-user-to-db", async () => {
      await connectDB();

      const userData = getClerkUser(event);

      if (!userData) {
        console.error("❌ No user data found for clerk/user.created");
        return { success: false, error: "No user data found" };
      }

      const { id, first_name, last_name, image_url } = userData;
      const email =
        userData.email_addresses?.[0]?.email_address || null;

      const newUser = {
        clerkId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      };

      const user = await User.create(newUser);
      console.log("✅ User saved to MongoDB:", user);

      // Sync Stream user
      try {
        await upsertStreamUser({
          id: newUser.clerkId.toString(),
          name: newUser.name,
          image: newUser.profileImage,
        });
        console.log("✅ Stream user created/updated");
      } catch (err) {
        console.error("⚠️ Stream user creation warning:", err.message);
      }

      return { success: true, userId: user._id };
    });
  }
);

// ------------------ User Deleted ------------------
export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    return await step.run("delete-user", async () => {
      await connectDB();

      const userData = getClerkUser(event);

      if (!userData) {
        console.error("❌ No user data found for clerk/user.deleted");
        return { success: false, error: "No user data found" };
      }

      const { id } = userData;

      const result = await User.deleteOne({ clerkId: id });
      console.log("✅ User deleted from MongoDB:", id);

      // Sync Stream delete
      try {
        await deleteStreamUser(id.toString());
        console.log("✅ Stream user deleted");
      } catch (err) {
        console.error("⚠️ Stream user delete warning:", err.message);
      }

      return { success: true, deletedCount: result.deletedCount };
    });
  }
);

// Export all functions
export const functions = [syncUser, deleteUserFromDB];
