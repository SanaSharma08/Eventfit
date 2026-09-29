import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Preference from "@/models/Preference";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) {
          return false;
        }

        await connectToDatabase();

        const dbUser = await User.findOneAndUpdate(
  { email: user.email },
  {
    $set: {
      name: user.name || "EventFit User",
      avatar: user.image,
    },
  },
  {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  }
);

await Preference.findOneAndUpdate(
  { userId: dbUser._id },
  {
    $setOnInsert: {
      interests: [],
      preferredEventTypes: [],
      availableDays: [],
      preferredStartTime: "09:00",
      preferredEndTime: "22:00",
      maxTravelMinutes: 60,
      homeLocation: {
        city: "New Delhi",
        state: "Delhi",
        country: "India",
        coordinates: {
          lat: 28.6139,
          lng: 77.2090,
        },
      },
    },
  },
  {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  }
);

        return true;
      } catch (error) {
        console.error("Failed to sync user:", error);
        return false;
      }
    },
  },
};