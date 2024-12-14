"use server";

import React from "react";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import User from "@/models/User";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required.");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;
  if (isBookmarked) {
    //If already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
  }

  await user.save();

  revalidatePath("/properties/saved", "page");
  return { message, isBookmarked };
}

export default bookmarkProperty;
