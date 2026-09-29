import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Preference from "@/models/Preference";

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

    await connectToDatabase();

    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    const preference = user
      ? await Preference.findOne({
          userId: user._id,
        }).lean()
      : null;

    return NextResponse.json({
      success: true,
      sessionUser: session.user,
      databaseUser: user,
      preference,
    });
  } catch (error) {
    console.error("Auth user lookup failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve authenticated user",
      },
      { status: 500 }
    );
  }
}