"use server";

import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import User from "@/models/User";
import Message from "@/models/Message";

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found.");
  }
  // Verify that the user is the receiver of the message
  if (message.receiver.toString() !== userId) {
    throw new Error("You are not authorized to read this message.");
  }

  message.read = !message.read;

  revalidatePath(`/messages`, "page");

  await message.save();

  return message.read;
}

export default markMessageAsRead;
