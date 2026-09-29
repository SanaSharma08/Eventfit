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
    await connectToDatabase();

    const body = await request.json();

    const event = await Event.create(body);

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

export async function DELETE() {
  try {
    await connectToDatabase();

    await Event.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All events deleted",
    });
  } catch (error) {
    console.error("Failed to delete events:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete events",
      },
      { status: 500 }
    );
  }
}