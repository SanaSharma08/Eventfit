import mongoose from "mongoose";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/services/users";
import {
  registerForEvent,
  getRegistrationsByUserId,
} from "@/services/registrations";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
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

    if (!body.eventId) {
      return NextResponse.json(
        {
          success: false,
          message: "Event ID is required",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(body.eventId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event ID",
        },
        { status: 400 }
      );
    }

    const event = await Event.findById(body.eventId).lean();

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 }
      );
    }

    const registration = await registerForEvent(
      user._id,
      body.eventId
    );

    return NextResponse.json(
      {
        success: true,
        registration,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration failed:", error);
    if (error instanceof Error && error.message === "EVENT_FULL") {
  return NextResponse.json(
    {
      success: false,
      message: "This event is currently full.",
    },
    { status: 409 }
  );
}

if (error instanceof Error && error.message === "EVENT_NOT_FOUND") {
  return NextResponse.json(
    {
      success: false,
      message: "Event not found",
    },
    { status: 404 }
  );
}
    // Duplicate registration
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already registered for this event.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register for event",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
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

    const registrations = await getRegistrationsByUserId(user._id);

    return NextResponse.json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error("Failed to get registrations:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get registrations",
      },
      { status: 500 }
    );
  }
}