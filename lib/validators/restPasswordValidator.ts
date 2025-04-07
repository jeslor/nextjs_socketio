import { z } from "zod";

export const resetPasswordValidator = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must include at least one special character"
      )
      .regex(/[A-Z]/, "Password must include at least one uppercase letter"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
