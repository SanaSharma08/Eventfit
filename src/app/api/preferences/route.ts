import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { preferenceSchema } from "@/lib/validations/preferences";
import { getUserByEmail } from "@/services/users";
import {
  getPreferenceByUserId,
  updatePreferenceByUserId,
} from "@/services/preferences";

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

    const preference = await getPreferenceByUserId(user._id);

    return NextResponse.json({
      success: true,
      preference,
    });
  } catch (error) {
    console.error("Failed to get preferences:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get preferences",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
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

    const result = preferenceSchema.safeParse(body);

    if (!result.success) {
    return NextResponse.json(
        {
        success: false,
        message: "Invalid preference data",
        errors: result.error.flatten(),
        },
        { status: 400 }
    );
    }

    const preference = await updatePreferenceByUserId(
    user._id,
    result.data
    );

    return NextResponse.json({
      success: true,
      preference,
    });
  } catch (error) {
    console.error("Failed to update preferences:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update preferences",
      },
      { status: 500 }
    );
  }
}