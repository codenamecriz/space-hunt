"use server";

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";

async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const unreadCount = await Message.countDocuments({
    receiver: userId,
    read: false,
  });

  return { unreadCount };
}

export default getUnreadMessageCount;
