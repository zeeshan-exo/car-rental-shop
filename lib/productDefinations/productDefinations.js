import {z} from 'zod'

export const ProductSchema = z.object({
    carName:z.string(),
    brand:z.string(),
    model:z.string(),
    price:z.string(),
    description:z.string(),
    image:z.string().url(),
   
 
})