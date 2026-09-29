import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import User from "@/models/User";
import Preference from "@/models/Preference";
import { calculateEventFit } from "@/services/event-fit";

export async function GET() {
  try {
    await connectToDatabase();

    const user = await User.findOne({
      email: "demo@eventfit.dev",
    }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Demo user not found",
        },
        { status: 404 }
      );
    }

    const preference = await Preference.findOne({
      userId: user._id,
    }).lean();

    if (!preference) {
      return NextResponse.json(
        {
          success: false,
          message: "User preferences not found",
        },
        { status: 404 }
      );
    }

    const events = await Event.find()
      .sort({ date: 1 })
      .lean();

    if (events.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No events found",
        },
        { status: 404 }
      );
    }

    const results = events.map((event) => ({
      event: {
        id: event._id,
        title: event.title,
        category: event.category,
      },
      fit: calculateEventFit(event, preference),
    }));

    return NextResponse.json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
      },

      results,
    });
  } catch (error) {
    console.error("Fit test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to calculate event fit",
      },
      { status: 500 }
    );
  }
}