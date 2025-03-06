import { z } from "zod";

export const BookingSchema = z.object({
  pickupDate: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date({ required_error: "Pickup date is required" })
  ),
  returnDate: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date({ required_error: "Return date is required" })
  ),
  pickupTime: z.string().min(1, "Pickup time is required"),
  pickupLocation: z.string().min(5, "Pickup location is required"),

  status: z.enum(["pending", "confirmed", "dispatched", "delivered", "reject"]).default("pending"),


  carDetails: z.object({
    carId: z.string().optional(),
    carModel: z.preprocess((val) => String(val), z.string().optional()),
    carName: z.string().optional(),
  }),

  vendorDetails: z.object({
    vendorId: z.string().optional(),
    vendorName: z.string().optional(),
    vendorEmail: z.string().optional(),
  }),

  userDetails: z.object({
    userId: z.string().optional(),
    userName: z.string().optional(),
    email: z.string().email("Invalid email format"),
    contact: z.string().min(11, "Contact number must be at least 11 characters"),
  }),

//   totalAmount: z.number().positive("Total amount must be positive"),
//   transactionId: z.string().optional(),
  paymentStatus: z.enum(["paid", "unpaid", "refunded"]).default("unpaid"),

  createdAt: z.date().optional(),
});

export type BookingType = z.infer<typeof BookingSchema>;

