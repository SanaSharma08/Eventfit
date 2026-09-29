import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";

export async function registerForEvent(
  userId: string,
  eventId: string
) {
  await connectToDatabase();

  const event = await Event.findById(eventId).lean();

  if (!event) {
    throw new Error("EVENT_NOT_FOUND");
  }

  const registrationCount = await Registration.countDocuments({
    eventId,
    status: "registered",
  });

  if (registrationCount >= event.capacity) {
    throw new Error("EVENT_FULL");
  }

  const registration = await Registration.create({
    userId: new mongoose.Types.ObjectId(userId),
    eventId: new mongoose.Types.ObjectId(eventId),
    status: "registered",
  });

  return JSON.parse(JSON.stringify(registration));
}

export async function getRegistrationsByUserId(userId: string) {
  await connectToDatabase();

  const registrations = await Registration.find({
    userId,
    status: "registered",
  })
    .populate("eventId")
    .sort({ registeredAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(registrations));
}
export async function getRegistrationCountByEventId(
  eventId: string
) {
  await connectToDatabase();

  return Registration.countDocuments({
    eventId,
    status: "registered",
  });
}
export async function getRegistrationByUserAndEvent(
  userId: string,
  eventId: string
) {
  await connectToDatabase();

  const registration = await Registration.findOne({
    userId,
    eventId,
    status: "registered",
  }).lean();

  return registration
    ? JSON.parse(JSON.stringify(registration))
    : null;
}