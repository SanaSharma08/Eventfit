import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Preference from "@/models/Preference";

export async function GET() {
  try {
    await connectToDatabase();

    let user = await User.findOne({
      email: "demo@eventfit.dev",
    });

    if (!user) {
      user = await User.create({
        name: "EventFit Demo User",
        email: "demo@eventfit.dev",
      });
    }

    let preference = await Preference.findOne({
      userId: user._id,
    });

    if (!preference) {
      preference = await Preference.create({
        userId: user._id,

        interests: [
          "AI",
          "Artificial Intelligence",
          "Startups",
        ],

        preferredEventTypes: [
          "Technology",
        ],

        availableDays: [
          "Saturday",
          "Sunday",
        ],

        preferredStartTime: "09:00",
        preferredEndTime: "18:00",

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
      });
    }

    return NextResponse.json({
      success: true,
      user,
      preference,
    });
  } catch (error) {
    console.error("Test user creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create test user",
      },
      { status: 500 }
    );
  }
}