import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(10).max(5000),
  category: z.string().min(1).max(50),
  tags: z.array(z.string().min(1)).default([]),

  date: z.coerce.date(),

  startTime: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "Invalid start time"
    ),

  endTime: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "Invalid end time"
    ),

  location: z.object({
    venue: z.string().min(1).max(200),
    address: z.string().min(1).max(300),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    country: z.string().min(1).max(100).default("India"),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
  }),

  price: z.number().min(0),
  currency: z.string().default("INR"),
  capacity: z.number().int().min(1),
  image: z.string().url().optional(),
});