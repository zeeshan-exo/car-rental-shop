import {z} from 'zod'

export const SignupFormSchema = z.object({
    name:z
    .string()
    .min(4, {message: "name must be minimum at least four charcters"})
    .trim(),
    email:z.string().email({message: "Please enter a valid email"}).trim(),
    password:z
    .string()
    .min(6, {message: "Password must contain 6 charcters"})
    .trim(),
    role:z
    .enum(['vendor', 'customer'])
})

export const LoginformSchema = z.object({
    email:z.string().email({message: "Please enter a valid email"}).trim(),
    password:z
    .string()
    .min(6, {message: "Password must contain 6 charcters"})
    .trim()
})