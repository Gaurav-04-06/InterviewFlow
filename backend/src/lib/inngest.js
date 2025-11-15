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
      try {
        await connectDB();

        // ✅ FIX: Extract data from the nested structure
        // Your server sends: { data: { data: clerkUserData } }
        // So we need to access event.data.data
        const userData = event.data?.data || event.data;

        console.log("📦 Full event:", JSON.stringify(event, null, 2));
        console.log(
          "👤 User data extracted:",
          JSON.stringify(userData, null, 2)
        );

        if (!userData || !userData.id) {
          console.error("❌ No user data found in event");
          console.error("Event structure:", event);
          return { success: false, error: "No user data found" };
        }

        // Extract user information from Clerk webhook data
        const userId = userData.id;
        const firstName = userData.first_name || "";
        const lastName = userData.last_name || "";
        const imageUrl = userData.image_url || userData.profile_image_url || "";

        // Get primary email from email_addresses array
        const primaryEmail = userData.email_addresses?.find(
          (email) => email.id === userData.primary_email_address_id
        );
        const email =
          primaryEmail?.email_address ||
          userData.email_addresses?.[0]?.email_address;

        // Validate required fields
        if (!email) {
          console.error("❌ No email found for user:", userId);
          return { success: false, error: "No email address found" };
        }

        const userPayload = {
          clerkId: userId,
          email: email,
          name: `${firstName} ${lastName}`.trim() || email.split("@")[0],
          profileImage: imageUrl,
        };

        console.log("💾 Saving user to MongoDB:", userPayload);

        // Use findOneAndUpdate with upsert to handle duplicates
        const user = await User.findOneAndUpdate(
          { clerkId: userId },
          userPayload,
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true,
          }
        );

        console.log("✅ User saved to MongoDB successfully:", {
          _id: user._id,
          clerkId: user.clerkId,
          email: user.email,
          name: user.name,
        });

        // Create Stream user
        try {
          await upsertStreamUser({
            id: userId,
            name: userPayload.name,
            image: userPayload.profileImage,
          });
          console.log("✅ User saved to Stream successfully");
        } catch (streamError) {
          console.error("⚠️ Stream error (non-blocking):", {
            message: streamError.message,
            userId: userId,
          });
          // Don't fail the whole operation
        }

        return {
          success: true,
          userId: user._id.toString(),
          clerkId: userId,
          email: email,
          message: "User created successfully",
        };
      } catch (error) {
        console.error("❌ Fatal error in syncUser:", {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });

        return {
          success: false,
          error: error.message,
          errorType: error.name,
        };
      }
    });
  }
);

export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    return await step.run("delete-user", async () => {
      try {
        await connectDB();

        // Extract data from nested structure
        const userData = event.data?.data || event.data;

        console.log(
          "🗑️ Delete event received:",
          JSON.stringify(event, null, 2)
        );
        console.log("👤 User data for deletion:", userData);

        if (!userData || !userData.id) {
          console.error("❌ No user ID found in delete event");
          return { success: false, error: "No user ID found" };
        }

        const userId = userData.id;

        console.log("🗑️ Attempting to delete user with clerkId:", userId);

        // Delete from MongoDB
        const result = await User.deleteOne({ clerkId: userId });

        if (result.deletedCount === 0) {
          console.warn("⚠️ No user found in MongoDB with clerkId:", userId);
        } else {
          console.log("✅ User deleted from MongoDB:", userId);
        }

        // Delete from Stream
        try {
          await deleteStreamUser(userId);
          console.log("✅ User deleted from Stream successfully");
        } catch (streamError) {
          console.error("⚠️ Stream deletion error (non-blocking):", {
            message: streamError.message,
            userId: userId,
          });
        }

        return {
          success: true,
          deletedCount: result.deletedCount,
          clerkId: userId,
          message:
            result.deletedCount > 0
              ? "User deleted successfully"
              : "User not found",
        };
      } catch (error) {
        console.error("❌ Fatal error in deleteUserFromDB:", {
          message: error.message,
          stack: error.stack,
        });

        return {
          success: false,
          error: error.message,
        };
      }
    });
  }
);

export const functions = [syncUser, deleteUserFromDB];
