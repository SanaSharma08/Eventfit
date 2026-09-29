import { connectToDatabase } from "@/lib/mongodb";
import Preference from "@/models/Preference";

export async function getPreferenceByUserId(
  userId: string
) {
  await connectToDatabase();

  const preference = await Preference.findOne({
    userId,
  }).lean();

  if (!preference) {
    return null;
  }

  return JSON.parse(JSON.stringify(preference));
}