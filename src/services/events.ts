import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function getEvents() {
  await connectToDatabase();

  const events = await Event.find()
    .sort({ date: 1 })
    .lean();

  return JSON.parse(JSON.stringify(events));
}
export async function getEventById(id: string) {
  await connectToDatabase();

  const event = await Event.findById(id).lean();

  if (!event) {
    return null;
  }

  return JSON.parse(JSON.stringify(event));
}