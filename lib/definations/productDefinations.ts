import { z } from 'zod'

export const ProductSchema = z.object({
    carName: z.string(),
    brand: z.string(),
    model: z.string(),
    price: z.string(),
    description: z.string(),
    carQuantity:z.string(),
    vendorId: z.string(),
    images: z.array(
      z.object({
        cloudinaryUrl: z.string().url(),
        cloudinaryId: z.string(),
      })
    ),
});