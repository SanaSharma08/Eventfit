import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function getUserByEmail(email: string) {
  await connectToDatabase();

  const user = await User.findOne({
    email,
  }).lean();

  if (!user) {
    return null;
  }

  return JSON.parse(JSON.stringify(user));
}