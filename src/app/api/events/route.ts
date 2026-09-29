import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eventSchema } from "@/lib/validations/events";
import { getUserByEmail } from "@/services/users";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectToDatabase();

    const events = await Event.find()
      .sort({ date: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const result = eventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const event = await Event.create({
      ...result.data,
      organizerId: user._id,
    });

    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create event",
      },
      { status: 500 }
    );
  }
}

