import { connectToDatabase } from "@/lib/mongodb";
import Preference from "@/models/Preference";

export async function getPreferenceByUserId(userId: string) {
  await connectToDatabase();

  const preference = await Preference.findOne({
    userId,
  }).lean();

  if (!preference) {
    return null;
  }

  return JSON.parse(JSON.stringify(preference));
}

export async function updatePreferenceByUserId(
  userId: string,
  data: {
    interests: string[];
    preferredEventTypes: string[];
    availableDays: string[];
    preferredStartTime: string;
    preferredEndTime: string;
    maxTravelMinutes: number;
    homeLocation: {
      city: string;
      state: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  }
) {
  await connectToDatabase();

  const preference = await Preference.findOneAndUpdate(
    { userId },
    { $set: data },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  ).lean();

  return JSON.parse(JSON.stringify(preference));
}