import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //Keep loging in as different user
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      //1. Connect to database
      await connectDB();
      //2. Check if user exist
      const userExist = await User.findOne({ email: profile.email });
      //3. If not, then add user to database
      if (!userExist) {
        // Truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: username,
          imate: profile.picture,
        });
      }
      //4. Return true to allow signin
      return true;
    },

    // Modify th session object
    async session({ session }) {
      //1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      //2. Assign the user id to the session
      session.user.id = user._id.toString();
      //3. Return session
      return session;
    },
  },
};
