import { z } from "zod";

export const preferenceSchema = z.object({
  interests: z.array(z.string().min(1)).default([]),

  preferredEventTypes: z.array(z.string().min(1)).default([]),

  availableDays: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
    )
    .default([]),

  preferredStartTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid start time"
  ),

  preferredEndTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid end time"
  ),

  maxTravelMinutes: z
    .number()
    .int()
    .min(15)
    .max(180),

  homeLocation: z.object({
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
  }),
});