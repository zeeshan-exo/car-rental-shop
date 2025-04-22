import { z } from "zod";

export const BookingCreateSchema = z.object({
  dateRange: z.object({
    from: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
      z.date({ required_error: "Pickup date is required" })
    ),
    to: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
      z.date({ required_error: "Return date is required" })
    ),
  }).refine(
    (data) => data.to >= data.from,
    { message: "Return date must be after pickup date", path: ["to"] }
  ),
  pickupTime: z.string().min(1, "Pickup time is required"),
  pickupLocation: z.string().min(5, "Pickup location is required"),
  status: z.enum(["pending", "confirmed", "dispatched", "delivered", "reject"]).default("pending"),
  carDetails: z.object({
    carId: z.string().optional(),
    carModel: z.number(),
    carName: z.string(),
  }),
  vendorDetails: z.object({
    vendorId: z.string().optional(),
    vendorName: z.string().optional(),
    vendorEmail: z.string().optional(),
  }),
  userDetails: z.object({
    userId: z.string(),
    userName: z.string(),
    email: z.string().email("Invalid email format"),
    contact: z.string().min(11, "Contact number must be at least 11 characters"),
  }),
  paymentStatus: z.enum(["paid", "pending", "refunded"]),
  paymentMethod: z.enum(["cashOnDelivery", "card"]).default("cashOnDelivery"),
  createdAt: z.date().optional(),
});

export type BookingCreate = z.infer<typeof BookingCreateSchema>;

export const BookingSchema = BookingCreateSchema.extend({
  _id: z.string().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;