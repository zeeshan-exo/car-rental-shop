import { z } from "zod";

export const OrderSchema = z.object({
    email: z.string().email("Invalid email format"),
    idcard: z.string().min(5, "ID card must be at least 5 characters"),
    date: z.string(),
    time: z.string(),
    address: z.string().min(5, "Address must be at least 5 characters"),
    carModel: z.string(),
    carName:z.string(),
    status:z.enum(["pending", "confirmed", "dispatched", "dileverd"]).default("pending")
});
