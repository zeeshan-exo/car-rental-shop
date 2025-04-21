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
  // age: z.number().optional(),
  // country: z.string(),
  // status: z.enum(["active", "inactive"]).default("inactive"),
  // image: z.object({
  //   cloudinaryUrl: z.string().url(),
  //   cloudinaryId: z.string(),
  // }).optional()
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

export const BioFormSchema = z.object({
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, { message: "You must be at least 18" }),
  country: z.string().min(2, "Country is required").trim(),
  bio: z.string().max(250, "Bio must be under 250 characters").optional(),
  image: z
    .object({
      cloudinaryUrl: z.string().url(),
      cloudinaryId: z.string(),
    })
    .optional(),
});

export type BioType = z.infer<typeof BioFormSchema>


export type SignupType = z.infer<typeof SignupFormSchema>;
export type LoginType = z.infer<typeof LoginFormSchema>;