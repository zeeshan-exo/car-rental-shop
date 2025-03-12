// import {z} from 'zod'

// export const SignupFormSchema = z.object({
//     name: z.string()
//         .min(4, { message: "Minimum at least four characters required for name" })
//         .trim(),
//     email: z.string()
//         .email({ message: "Please enter a valid email" })
//         .trim(),
//     password: z.string()
//         .min(6, { message: "Password must contain 6 characters" })
//         .trim(),
//     role: z.enum(["vendor", "customer"]),
//     // cars_quantity: z.string().optional(),
//     idCard: z.string().optional(),
//     address: z.string().optional(),
//     status: z.enum(["active", "inactive"]).default("inactive"),
// });
//  export type SignupType = z.infer<typeof SignupFormSchema>

// export const LoginformSchema = z.object({
//     email:z.string().email({message: "Please enter a valid email"}).trim(),
//     password:z
//     .string()
//     .min(6, {message: "Password must contain 6 charcters"})
//     .trim()
// })
// type LoginType = z.infer<typeof LoginformSchema>



import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .trim()
    .refine((val) => val.length > 0, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim()
    .refine((val) => val.length > 0, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim()
    .refine((val) => val.length > 0, { message: "Password is required" }),
  role: z.enum(["vendor", "customer", "admin"], { message: "Role must be 'vendor' or 'customer'" }),
  idCard: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("inactive"),
});


export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim()
    .refine((val) => val.length > 0, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim()
    .refine((val) => val.length > 0, { message: "Password is required" }),
});

// Exported Types
export type SignupType = z.infer<typeof SignupFormSchema>;
export type LoginType = z.infer<typeof LoginFormSchema>;