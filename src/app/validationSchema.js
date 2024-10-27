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
export const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z.number().min(1, "Price is required"),
  overprice: z.number().min(1, "Overrated price is required"),
  details: z.string().min(1, "Product details is required"),
  stockquantity: z.string().min(1, "Stock quantity is required"),
  collection: z.string().min(1, "Collection is required"),
  associatedWith: z.string().min(1, "Associated with is required"),
});

export const billingSchema = z.object({
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  state: z.string().min(1, "State is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town / City is required"),
  phoneNumber: z.string().min(11, "Valid phone number is required"),
});

export const messageSchema = z.object({
  message: z.string().min(1, "message content is required"),
  subject: z.string().min(1, "subject is required"),
  email: z.string().min(1, "email is required"),
  name: z.string().min(1, "Name is required"),
});

export const feedbackSchema = z.object({
  content: z.string().min(1, "Content is required"),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position / Status / Job Role is required"),
});
export const newsSchema = z.object({
  content1: z.string().min(1, "Content (1) is required"),
  content2: z.string().min(1, "Content (2) is required"),
  content3: z.string().min(1, "Content (3) is required"),
  headline: z.string().min(1, "Headline is required"),
  date: z.string().min(1, "Date is required"),
});
