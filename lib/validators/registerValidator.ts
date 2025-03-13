import { z } from "zod"


export const registerValidator = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password:  z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character like !@#$%^&*(),.?\":{}|<>")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    })