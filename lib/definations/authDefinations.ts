import {z} from 'zod'

export const SignupFormSchema = z.object({
    name: z.string()
        .min(4, { message: "Minimum at least four characters required for name" })
        .trim(),
    email: z.string()
        .email({ message: "Please enter a valid email" })
        .trim(),
    password: z.string()
        .min(6, { message: "Password must contain 6 characters" })
        .trim(),
    role: z.enum(["vendor", "customer"]),
    // cars_quantity: z.string().optional(),
    idCard: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(["active", "inactive"]).default("inactive"),
});
 export type SignupType = z.infer<typeof SignupFormSchema>

export const LoginformSchema = z.object({
    email:z.string().email({message: "Please enter a valid email"}).trim(),
    password:z
    .string()
    .min(6, {message: "Password must contain 6 charcters"})
    .trim()
})
type LoginType = z.infer<typeof LoginformSchema>