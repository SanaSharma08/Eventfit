import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function getDemoUser() {
  await connectToDatabase();

  const user = await User.findOne({
    email: "demo@eventfit.dev",
  }).lean();

  if (!user) {
    return null;
  }

  return JSON.parse(JSON.stringify(user));
}