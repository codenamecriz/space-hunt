import MessageCard from "@/components/Message/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { convertToSerializableObject } from "@/utils/convertToSerializableObject";
import { getSessionUser } from "@/utils/getSessionUser";
import React from "react";

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMesages = await Message.find({ receiver: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMesages = await Message.find({ receiver: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...readMesages, ...unreadMesages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(message.sender);
    message.property = convertToSerializableObject(message.property);
    return message;
  });

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24 max-2-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Messages</h1>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-center">No messages found.</p>
              ) : (
                messages.map((message) => (
                  <h3 key={message._id}>
                    <MessageCard key={message._id} message={message} />
                  </h3>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MessagesPage;
