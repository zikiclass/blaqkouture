import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required"),
    phone: z.string().min(11, "Valid phone number is required"),
    password: z.string().min(4, "Password should be at least 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password should be at least 4 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
