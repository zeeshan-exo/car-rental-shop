import { z } from 'zod';

export const CarSchema = z.object({
  carName: z.string(),
  brand: z.string(),
  modelYear: z.number().int().min(1900).max(new Date().getFullYear()),
  rentalRate: z.number(),
  details: z.object({
    text: z.string(),
    specs: z.object({
      fuelType: z.string().optional(),
      transmission: z.string().optional(),
      features: z.array(z.string()).optional(),
    }).optional(),
  }),
  carQuantity: z.number(),
  city: z.string(),
  isAvailable: z.enum(["available", "booked"]).default("available"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  vendor: z.object({
    vendorId: z.string(),
    vendorName: z.string(),
    vendorEmail: z.string().email(),
  }),
  images: z.array(
    z.object({
      cloudinaryUrl: z.string().url(),
      cloudinaryId: z.string(),
    })
  ),
});

export const CarDefinations = CarSchema.extend({
  _id:z.string()
})

export type AddCarType = z.infer<typeof CarSchema>
export type CarType = z.infer<typeof CarDefinations>

